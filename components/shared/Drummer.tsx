import React, { useEffect, useState } from "react";
import { FaAdjust, FaBan, FaCircle, FaClock, FaDotCircle, FaLock, FaLockOpen, FaLongArrowAltRight, FaMusic, FaPause, FaPlay, FaStepBackward, FaStepForward, FaStop, FaTachometerAlt, FaUndoAlt } from "react-icons/fa";
import Drum, { PIECE_KEY } from "../../structures/models/Drum";
import styles from "../../styles/drummer.module.sass";

export default function Drummer(props) {
	const drum: Drum = new Drum();
	const [tablature, setTablature] = useState(props.tablature);
	const [edit, setEdit] = useState(props.edit);
	const [timer, setTimer] = useState(undefined);
	const [pace, setPace] = useState(0);
	const [count, setCount] = useState(0);
	const [repeat, setRepeat] = useState(true);
	const [scrollLock, setScrollLock] = useState(true);
	const onTablatureChange = props.onTablatureChange ? props.onTablatureChange : null;

	useEffect(() => {
		if (edit && typeof document !== 'undefined') {
			document.addEventListener('keydown', handleKeyboardEvent);
		}

		return () => {
			if (edit && typeof document !== 'undefined') {
				document.removeEventListener('keydown', handleKeyboardEvent);
			}
		}
	}, []);

	useEffect(() => {
		if (scrollLock) {
			scroller();
		}
	}, [pace]);

	useEffect(() => {
		if (onTablatureChange) {
			onTablatureChange(tablature);
		}
	},  [tablature])

	const handleKeyboardEvent = (event) => {
		if (timer && PIECE_KEY[event.code] !== 'undefined') {
			writeNote(PIECE_KEY[event.code], pace);
		}
	}

	const scroller = () => {
		const staff = document.getElementById('staff');
		const beats = document.getElementById('beats');
		const position = (beats.scrollWidth * pace / tablature.getTotalBeats()) - (staff.scrollWidth / 2);

		beats.scrollTo({left: position});
	}

	const beatIcon = (beat) => {
		switch (beat) {
			case 1:
				return <span className="icon is-small"><FaCircle /></span>
			case 2:
				return <span className="icon is-small"><FaAdjust /></span>
			case 3:
				return <span className="icon is-small"><FaDotCircle /></span>
			case 4:
				return <span className="icon is-small"><FaCircle /></span>
			case 5:
				return <span className="icon is-small"><FaBan /></span>
		}
	}

	const counter = () => {
		setCount(0);
		setTimer(setInterval(() => {
			if (count < 2) {
				setCount(count + 1);
				drum.stick.play();
			} else {
				clearTimer();
				play();
			}
		}, tablature.getSpeedPerSec() * 1000));
	}

	const play = () => {
		setTimer(setInterval(() => {
			let pace = nextPace();

			readNotes(tablature.staff[pace]);
			setPace(pace);
		}, tablature.getSpeedPerTime() * 1000));

		readNotes(tablature.staff[pace]);
	}

	const pause = () => {
		clearTimer();
	}

	const stop = () => {
		clearTimer();
		setPace(0);
	}

	const skipPrev = () => {
		setPace(tablature.getFirstBeatInPreviousBar(pace));
	}

	const skipNext = () => {
		setPace(tablature.getFirstBeatInNextBar(pace));
	}

	const nextPace = () => {
		if (repeat && pace == tablature.getLastBeatInBar(pace) - 1) {
			return tablature.getFirstBeatInBar(pace);
		}

		if (pace == tablature.getTotalBeats() - 1) {
			if (edit) {
				tablature.addBar();

				setTablature(tablature);
			} else {
				stop();
			}
		}

		return pace + 1;
	}

	const writeNote = (note, pace) => {
		if (!edit) {
			return;
		}

		if (tablature.hitNote(note, pace)) {
			drum.hitNote(note);
		}

		setTablature(tablature);
	}

	const readNotes = (notes) => {
		notes.forEach((note, index) => {
			if (note) {
				drum.hitNote(index);
			}
		});
	}

	const toggleRepeat = () => {
		setRepeat(!repeat);
	}

	const toggleScrollLock = () => {
		setScrollLock(!scrollLock);
	}

	const clearTimer = () => {
		clearInterval(timer);
		setTimer(undefined);
	}

	const setBeats = (e) => {
		if (!edit) {
			return false;
		}

		const value = parseInt(e.target.value ? e.target.value : 0);
		const min = parseInt(e.target.min);
		const max = parseInt(e.target.max);

		if (value < min) {
			tablature.setBeats(min);
		} else if (value > max) {
			tablature.setBeats(max);
		} else {
			tablature.setBeats(value);
		}

		setTablature(tablature);
	}

	const setTimes = (e) => {
		if (!edit) {
			return false;
		}

		const value = parseInt(e.target.value ? e.target.value : 0);
		const min = parseInt(e.target.min);
		const max = parseInt(e.target.max);

		if (value < min) {
			tablature.setTimes(min);
		} else if (value > max) {
			tablature.setTimes(max);
		} else {
			tablature.setTimes(value);
		}

		setTablature(tablature);
	}

	const setBeatsPerMin = (e) => {
		const value = parseInt(e.target.value ? e.target.value : 0);
		const min = parseInt(e.target.min);
		const max = parseInt(e.target.max);

		if (value < min) {
			tablature.setBeatsPerMin(min);
		} else if (value > max) {
			tablature.setBeatsPerMin(max);
		} else {
			tablature.setBeatsPerMin(value);
		}

		setTablature(tablature);

		if (timer) {
			clearTimer();
			play();
		}
	}

	return (
		<div id="tablature">
			<div className="columns">
				<div className="column is-narrow">
					<button type="button" className="button is-small" title="Stop" onClick={stop}><span className="icon is-small"><FaStop /></span></button>
					<button type="button" className="button is-small" title="Previous Bar" onClick={skipPrev}><span className="icon is-small"><FaStepBackward /></span></button>
					{!timer && (<button type="button" className="button is-small" title="Play" onClick={counter}><span className="icon is-small"><FaPlay /></span></button>)}
					{timer && (<button type="button" className="button is-small" title="Pause" onClick={pause}><span className="icon is-small"><FaPause /></span></button>)}
					<button type="button" className="button is-small" title="Next Bar" onClick={skipNext}><span className="icon is-small"><FaStepForward /></span></button>
				</div>

				<div className="column is-narrow">
					{repeat && (<button type="button" className="button is-small" title="Repeat Bar" onClick={toggleRepeat}><span className="icon is-small"><FaUndoAlt /></span></button>)}
					{!repeat && (<button type="button" className="button is-small" title="Repeat Bar" onClick={toggleRepeat}><span className="icon is-small"><FaLongArrowAltRight /></span></button>)}
					{scrollLock && (<button type="button" className="button is-small" title="Scroll Lock" onClick={toggleScrollLock}><span className="icon is-small"><FaLock /></span></button>)}
					{!scrollLock && (<button type="button" className="button is-small" title="Scroll Lock" onClick={toggleScrollLock}><span className="icon is-small"><FaLockOpen /></span></button>)}
				</div>

				<div className="column is-narrow">
					<div className="field is-grouped">
						<span className="control has-icons-left">
							<input
								className="input is-small"
								type="number"
								placeholder="Times"
								min="1"
								max="16"
								style={{width: "80px"}}
								value={tablature.times}
								onChange={(e) => setTimes(e)}
								disabled={!edit} />
							<span className="icon is-small is-left"><FaClock /></span>
						</span>
						<span className="control has-icons-left">
							<input
								className="input is-small"
								type="number"
								placeholder="Beats"
								min="1"
								max="16"
								style={{width: "80px"}}
								value={tablature.beats}
								onChange={(e) => setBeats(e)}
								disabled={!edit} />
							<span className="icon is-small is-left"><FaMusic /></span>
						</span>
						<span className="control has-icons-left">
							<input
								className="input is-small"
								type="number"
								placeholder="BpM"
								min="1"
								max="300"
								style={{width: "80px"}}
								value={tablature.getBeatsPerMin()}
								onChange={(e) => setBeatsPerMin(e)} />
							<span className="icon is-small is-left"><FaTachometerAlt/></span>
						</span>
					</div>
				</div>
			</div>

			<div id="staff" className="pb-2">
				<div className={styles.pieces}>
					<button type="button" className={styles.mark}></button>
					{drum.pieces.map((piece) => { return (
						<button type="button" key={`piece-${piece.id}`} className={styles.mark} title={piece.name} onMouseDown={() => writeNote(piece.id, pace)}>{piece.abbr}</button>
					)})}
					<button type="button" className={styles.mark}></button>
				</div>
				<div id="beats" className={styles.beats}>
					{tablature.staff.map((beat, b) => { return (
						<div key={`beat-${b}`} className={`${styles.beat} ${b == pace ? styles.active : ""} ${(b % tablature.beats == 0) ? styles.time : ""} ${(b % tablature.getPrecision() == 0) ? styles.bar : ""}`}>
							<button type="button" className={styles.mark} onMouseDown={() => setPace(b)}>{tablature.getCurrentTime(b) + 1}</button>
							{beat.map((note, n) => { return (
								<button type="button" key={`note-${note}${n}`} className={styles.note} onMouseDown={() => writeNote(n, b)}>
									{beatIcon(note)}
								</button>
							)})}
							<button type="button" className={styles.mark} onMouseDown={() => setPace(b)}>{tablature.getCurrentTime(b) + 1}</button>
						</div>
					)})}
				</div>
			</div>

			<div className="content is-small pb-2">
				<p>{pace}/{tablature.getTotalBeats()}</p>
			</div>
		</div>
	)
}
