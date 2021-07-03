import React, { useEffect, useRef, useState } from 'react';
import { FaAdjust, FaBan, FaCircle, FaClock, FaDotCircle, FaLock, FaLockOpen, FaLongArrowAltRight, FaMusic, FaPause, FaPlay, FaStepBackward, FaStepForward, FaStop, FaTachometerAlt, FaUndoAlt } from 'react-icons/fa';
import Drum from 'models/Drum';
import Tablature from 'models/Tablature';
import styles from 'styles/drummer.module.sass';

export default function Drummer(props) {
	const edit = props.edit;
	const drum = new Drum();
	const [tablature, setTablature] = useState(new Tablature(props.tablature));
	const [count, setCount] = useState(0);
	const [counterDelay, setCounterDelay] = useState(null);
	const [pace, setPace] = useState(0);
	const [pacerDelay, setPacerDelay] = useState(null);
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
		};
	});
	
	useEffect(() => {
		if (pacerDelay) {
			const newPace = nextPace();

			readNotes(tablature.staff[newPace]);

			if (scrollLock) {
				scroller();
			}
			
			const pacer = setTimeout(() => {
				setPace(newPace);
			}, pacerDelay);

			return () => {
				clearTimeout(pacer);
			}
		}
  }, [pace, pacerDelay]);

	useEffect(() => {
    if (counterDelay) {
			if (count < 2) {
				drum.hitNote('d');
			} else {
				setCount(0);
				setCounterDelay(null);
				play();
			}

      const counter = setTimeout(() => {
				setCount(count + 1);
			}, counterDelay);

      return () => clearTimeout(counter);
    }
  }, [count, counterDelay]);

	useEffect(() => {
		if (onTablatureChange) {
			onTablatureChange(tablature);
		}
	}, [tablature]);

	const handleKeyboardEvent = (event) => {
		if (pacerDelay && drum.key[event.code] !== 'undefined') {
			writeNote(pace, drum.key[event.code]);
		}
	};

	const scroller = () => {
		const staff = document.getElementById('staff');
		const beats = document.getElementById('beats');
		const position = (beats.scrollWidth * pace) / tablature.getTotalBeats() - staff.scrollWidth / 2;

		beats.scrollTo({ left: position });
	};

	const beatIcon = (beat) => {
		switch (beat) {
			case 1:
				return <FaCircle />;
			case 2:
				return <FaAdjust />;
			case 3:
				return <FaDotCircle />;
			case 4:
				return <FaCircle />;
			case 5:
				return <FaBan />;
		}
	};

	const counter = () => {
		setCounterDelay(tablature.getSpeedPerSec() * 1000);
	};

	const play = () => {
		setPacerDelay(tablature.getSpeedPerTime() * 1000);
	};

	const pause = () => {
		setPacerDelay(null);
	};

	const stop = () => {
		setPacerDelay(null);
		setPace(0);
	};

	const skipPrev = () => {
		setPace(tablature.getFirstBeatInPreviousBar(pace));
	};

	const skipNext = () => {
		setPace(tablature.getFirstBeatInNextBar(pace));
	};

	const nextPace = () => {
		if (repeat && pace == tablature.getLastBeatInBar(pace) - 1) {
			return tablature.getFirstBeatInBar(pace);
		}

		if (pace == tablature.getTotalBeats() - 1) {
			if (edit) {
				tablature.addBar();

				setTablature(new Tablature(tablature));
			} else {
				stop();
			}
		}

		return pace + 1;
	};

	const writeNote = (pace, note, type = 1) => {
		if (!edit) {
			return;
		}

		if (tablature.hitNote(pace, note, type)) {
			drum.hitNote(note, type);
		}

		setTablature(new Tablature(tablature));
	};

	const readNotes = (notes) => {
		for (const key in notes) {
			if (notes[key]) {
				drum.hitNote(key);
			}
		}
	};

	const toggleRepeat = () => {
		setRepeat(!repeat);
	};

	const toggleScrollLock = () => {
		setScrollLock(!scrollLock);
	};

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
	};

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
	};

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

		if (pacerDelay) {
			play();
		}
	};

	return (
		<div id='tablature'>
			<div className='columns'>
				<div className='column is-narrow'>
					<button type='button' className='button is-small' title='Stop' onClick={stop}><FaStop /></button>
					<button type='button' className='button is-small' title='Previous Bar' onClick={skipPrev}><FaStepBackward /></button>
					{pacerDelay && (<button type='button' className='button is-small' title='Pause' onClick={pause}><FaPause /></button>)}
					{!pacerDelay && (<button type='button' className='button is-small' title='Play' onClick={counter}><FaPlay /></button>)}
					<button type='button' className='button is-small' title='Next Bar' onClick={skipNext}><FaStepForward /></button>
				</div>

				<div className='column is-narrow'>
					{repeat && (<button type='button' className='button is-small' title='Continuous Bar' onClick={toggleRepeat}><FaUndoAlt /></button>)}
					{!repeat && (<button type='button' className='button is-small' title='Repeat Bar' onClick={toggleRepeat}><FaLongArrowAltRight /></button>)}
					{scrollLock && (<button type='button' className='button is-small' title='Scroll Lock' onClick={toggleScrollLock}><FaLock /></button>)}
					{!scrollLock && (<button type='button' className='button is-small' title='Scroll Lock' onClick={toggleScrollLock}><FaLockOpen /></button>)}
				</div>

				<div className='column is-narrow'>
					<div className='field is-grouped'>
						<span className='control has-icons-left'>
							<input
								className='input is-small'
								type='number'
								placeholder='Times'
								min='1'
								max='16'
								style={{ width: '80px' }}
								value={tablature.times}
								onChange={(e) => setTimes(e)}
								disabled={!edit}
							/>
							<span className='icon is-left'><FaClock /></span>
						</span>
						<span className='control has-icons-left'>
							<input
								className='input is-small'
								type='number'
								placeholder='Beats'
								min='1'
								max='16'
								style={{ width: '80px' }}
								value={tablature.beats}
								onChange={(e) => setBeats(e)}
								disabled={!edit}
							/>
							<span className='icon is-left'><FaMusic /></span>
						</span>
						<span className='control has-icons-left'>
							<input
								className='input is-small'
								type='number'
								placeholder='BpM'
								min='1'
								max='300'
								style={{ width: '80px' }}
								value={tablature.getBeatsPerMin()}
								onChange={(e) => setBeatsPerMin(e)}
							/>
							<span className='icon is-left'><FaTachometerAlt /></span>
						</span>
					</div>
				</div>
			</div>

			<div id='staff' className='pb-2'>
				<div id="pieces" className={styles.pieces}>
					<button type='button' className={styles.mark}></button>
					<button type='button' className={styles.mark} onMouseDown={() => writeNote(pace, 'c')}>c</button>
					<button type='button' className={styles.mark} onMouseDown={() => writeNote(pace, 'h')}>h</button>
					<button type='button' className={styles.mark} onMouseDown={() => writeNote(pace, 'r')}>r</button>
					<button type='button' className={styles.mark} onMouseDown={() => writeNote(pace, 's')}>s</button>
					<button type='button' className={styles.mark} onMouseDown={() => writeNote(pace, 'th')}>th</button>
					<button type='button' className={styles.mark} onMouseDown={() => writeNote(pace, 'tm')}>tm</button>
					<button type='button' className={styles.mark} onMouseDown={() => writeNote(pace, 'tl')}>tl</button>
					<button type='button' className={styles.mark} onMouseDown={() => writeNote(pace, 'b')}>b</button>
					<button type='button' className={styles.mark}></button>
				</div>
				<div id='beats' className={styles.beats}>
					{tablature.staff.map((notes, b) => {
						return (
							<div key={`beat-${b}`} className={`${styles.beat} ${b == pace && styles.active} ${b % tablature.beats == 0 && styles.time} ${b % tablature.getPrecision() == 0 && styles.bar}`}>
								<button type='button' className={styles.mark} onMouseDown={() => setPace(b)}>{tablature.getCurrentTime(b) + 1}</button>
								<button type='button' className={styles.note} onMouseDown={() => writeNote(b, 'c')}>{beatIcon(notes.c)}</button>
								<button type='button' className={styles.note} onMouseDown={() => writeNote(b, 'h')}>{beatIcon(notes.h)}</button>
								<button type='button' className={styles.note} onMouseDown={() => writeNote(b, 'r')}>{beatIcon(notes.r)}</button>
								<button type='button' className={styles.note} onMouseDown={() => writeNote(b, 's')}>{beatIcon(notes.s)}</button>
								<button type='button' className={styles.note} onMouseDown={() => writeNote(b, 'th')}>{beatIcon(notes.th)}</button>
								<button type='button' className={styles.note} onMouseDown={() => writeNote(b, 'tm')}>{beatIcon(notes.tm)}</button>
								<button type='button' className={styles.note} onMouseDown={() => writeNote(b, 'tl')}>{beatIcon(notes.tl)}</button>
								<button type='button' className={styles.note} onMouseDown={() => writeNote(b, 'b')}>{beatIcon(notes.b)}</button>
								<button type='button' className={styles.mark} onMouseDown={() => setPace(b)}>{tablature.getCurrentTime(b) + 1}</button>
							</div>
						);
					})}
				</div>
			</div>

			<div className='content is-small pb-2'>
				<p>
					{pace}/{tablature.getTotalBeats()}
				</p>
			</div>
		</div>
	);
}
