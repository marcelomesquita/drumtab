import React from "react";
import { Drum, PIECE_KEY } from "../../models/drum";
import { Tablature } from "../../models/tablature";
import styles from "../../styles/drummer.module.sass";

interface DrummerProps {
	drum: Drum;
	tablature: Tablature;
	edit?: boolean;
	onTablatureChange?: any;
}

interface DrummerState {
	drum: Drum;
	tablature: Tablature;
	timer: NodeJS.Timeout;
	edit: boolean;
	pace: number;
	count: number;
	repeat: boolean;
	scrollLock: boolean;
	onTablatureChange: any;
}

class Drummer extends React.Component<DrummerProps, DrummerState> {
	constructor(props: DrummerProps) {
		super(props);

		this.state = {
			drum: props.drum,
			tablature: props.tablature,
			edit: props.edit ? props.edit : false,
			timer: undefined,
			pace: 0,
			count: 0,
			repeat: true,
			scrollLock: true,
			onTablatureChange: props.onTablatureChange ? props.onTablatureChange : null
		}
	}

	componentDidMount = () => {
		if (this.state.edit && typeof document !== 'undefined') {
			document.addEventListener('keydown', this.handleKeyboardEvent);
		}
	}

	componentWillUnmount = () => {
		if (this.state.edit && typeof document !== 'undefined') {
			document.removeEventListener('keydown', this.handleKeyboardEvent);
		}
	}

	handleKeyboardEvent = (event) => {
		if (this.state.timer && PIECE_KEY[event.code] !== 'undefined') {
			this.writeNote(PIECE_KEY[event.code], this.state.pace);
		}
	}

	scroller = () => {
		const staff = document.getElementById('staff');
		const beats = document.getElementById('beats');
		const position = (beats.scrollWidth * this.state.pace / this.state.tablature.getTotalBeats()) - (staff.scrollWidth / 2);

		beats.scrollTo({left: position});
	}

	beatIcon = (beat) => {
		switch (beat) {
			case 1:
				return <span className="icon is-small"><i className="fw fas fa-circle" /></span>
			case 2:
				return <span className="icon is-small"><i className="fw fas fa-adjust" /></span>
			case 3:
				return <span className="icon is-small"><i className="fw fas fa-dot-circle" /></span>
			case 4:
				return <span className="icon is-small"><i className="fw far fa-circle" /></span>
			case 5:
				return <span className="icon is-small"><i className="fw fas fa-ban" /></span>
		}
	}

	counter = () => {
		this.setCount(0);
		this.setState({timer: setInterval(() => {
			if (this.state.count < 2) {
				this.setCount(this.state.count + 1);
				this.state.drum.stick.play();
			} else {
				this.clearTimer();
				this.play();
			}
		}, this.state.tablature.getSpeedPerSec() * 1000)});
	}

	play = () => {
		this.setState({timer: setInterval(() => {
			let pace = this.nextPace();

			this.readNotes(this.state.tablature.staff[pace]);
			this.setPace(pace);
		}, this.state.tablature.getSpeedPerTime() * 1000)});

		this.readNotes(this.state.tablature.staff[this.state.pace]);
	}

	pause = () => {
		this.clearTimer();
	}

	stop = () => {
		this.clearTimer();
		this.setPace(0);
	}

	skipPrev = () => {
		this.setPace(this.state.tablature.getFirstBeatInPreviousBar(this.state.pace));
	}

	skipNext = () => {
		this.setPace(this.state.tablature.getFirstBeatInNextBar(this.state.pace));
	}

	nextPace = () => {
		if (this.state.repeat && this.state.pace == this.state.tablature.getLastBeatInBar(this.state.pace) - 1) {
			return this.state.tablature.getFirstBeatInBar(this.state.pace);
		}

		if (this.state.pace == this.state.tablature.getTotalBeats() - 1) {
			if (this.state.edit) {
				this.state.tablature.addBar();

				this.setState(this.state);
			} else {
				this.stop();
			}
		}

		return this.state.pace + 1;
	}

	writeNote = (note, pace = this.state.pace) => {
		if (!this.state.edit) {
			return;
		}

		if (this.state.tablature.hitNote(note, pace)) {
			this.state.drum.hitNote(note);
		}

		this.setState(this.state);

		if (this.state.onTablatureChange) {
			this.state.onTablatureChange(this.state.tablature);
		}
	}

	readNotes = (notes) => {
		notes.forEach((note, index) => {
			if (note) {
				this.state.drum.hitNote(index);
			}
		});
	}

	toggleRepeat = () => {
		this.setState({ repeat: !this.state.repeat });
	}

	toggleScrollLock = () => {
		this.setState({ scrollLock: !this.state.scrollLock });
	}

	clearTimer = () => {
		clearInterval(this.state.timer);
		this.setState({timer: undefined});
	}

	setCount = (count) => {
		this.setState({count});
	}

	setPace = (pace) => {
		this.setState({pace});

		if (this.state.scrollLock) {
			this.scroller();
		}
	}

	setBeats = (e) => {
		if (!this.state.edit) {
			return false;
		}

		const value = parseInt(e.target.value ? e.target.value : 0);
		const min = parseInt(e.target.min);
		const max = parseInt(e.target.max);

		if (value < min) {
			this.state.tablature.setBeats(min);
		} else if (value > max) {
			this.state.tablature.setBeats(max);
		} else {
			this.state.tablature.setBeats(value);
		}

		this.setState(this.state);

		if (this.state.onTablatureChange) {
			this.state.onTablatureChange(this.state.tablature);
		}
	}

	setTimes = (e) => {
		if (!this.state.edit) {
			return false;
		}

		const value = parseInt(e.target.value ? e.target.value : 0);
		const min = parseInt(e.target.min);
		const max = parseInt(e.target.max);

		if (value < min) {
			this.state.tablature.setTimes(min);
		} else if (value > max) {
			this.state.tablature.setTimes(max);
		} else {
			this.state.tablature.setTimes(value);
		}

		this.setState(this.state);

		if (this.state.onTablatureChange) {
			this.state.onTablatureChange(this.state.tablature);
		}
	}

	setBeatsPerMin = (e) => {
		const value = parseInt(e.target.value ? e.target.value : 0);
		const min = parseInt(e.target.min);
		const max = parseInt(e.target.max);

		if (value < min) {
			this.state.tablature.setBeatsPerMin(min);
		} else if (value > max) {
			this.state.tablature.setBeatsPerMin(max);
		} else {
			this.state.tablature.setBeatsPerMin(value);
		}

		this.setState(this.state);

		if (this.state.onTablatureChange) {
			this.state.onTablatureChange(this.state.tablature);
		}

		if (this.state.timer) {
			this.clearTimer();
			this.play();
		}
	}

	render() {
		return (
			<div id="tablature">
				<div className="columns">
					<div className="column is-narrow">
						<button type="button" className="button is-small" title="Stop" onClick={this.stop}><span className="icon is-small"><i className="fw fas fa-stop" /></span></button>
						<button type="button" className="button is-small" title="Previous Bar" onClick={this.skipPrev}><span className="icon is-small"><i className="fw fas fa-step-backward" /></span></button>
						{!this.state.timer && (<button type="button" className="button is-small" title="Play" onClick={this.counter}><span className="icon is-small"><i className="fw fas fa-play" /></span></button>)}
						{this.state.timer && (<button type="button" className="button is-small" title="Pause" onClick={this.pause}><span className="icon is-small"><i className="fw fas fa-pause" /></span></button>)}
						<button type="button" className="button is-small" title="Next Bar" onClick={this.skipNext}><span className="icon is-small"><i className="fw fas fa-step-forward" /></span></button>
					</div>

					<div className="column is-narrow">
						{this.state.repeat && (<button type="button" className="button is-small" title="Repeat Bar" onClick={this.toggleRepeat}><span className="icon is-small"><i className="fw fas fa-undo-alt" /></span></button>)}
						{!this.state.repeat && (<button type="button" className="button is-small" title="Repeat Bar" onClick={this.toggleRepeat}><span className="icon is-small"><i className="fas fa-long-arrow-alt-right" /></span></button>)}
						{this.state.scrollLock && (<button type="button" className="button is-small" title="Scroll Lock" onClick={this.toggleScrollLock}><span className="icon is-small"><i className="fw fas fa-lock" /></span></button>)}
						{!this.state.scrollLock && (<button type="button" className="button is-small" title="Scroll Lock" onClick={this.toggleScrollLock}><span className="icon is-small"><i className="fw fas fa-lock-open" /></span></button>)}
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
									value={this.state.tablature.times}
									onChange={(e) => this.setTimes(e)}
									disabled={!this.state.edit} />
								<span className="icon is-small is-left"><i className="fw fas fa-clock" /></span>
							</span>
							<span className="control has-icons-left">
								<input
									className="input is-small"
									type="number"
									placeholder="Beats"
									min="1"
									max="16"
									style={{width: "80px"}}
									value={this.state.tablature.beats}
									onChange={(e) => this.setBeats(e)}
									disabled={!this.state.edit} />
								<span className="icon is-small is-left"><i className="fw fas fa-music" /></span>
							</span>
							<span className="control has-icons-left">
								<input
									className="input is-small"
									type="number"
									placeholder="BpM"
									min="1"
									max="300"
									style={{width: "80px"}}
									value={this.state.tablature.getBeatsPerMin()}
									onChange={(e) => this.setBeatsPerMin(e)} />
								<span className="icon is-small is-left"><i className="fw fas fa-tachometer-alt" /></span>
							</span>
						</div>
					</div>
				</div>

				<div id="staff" className="pb-2">
					<div className={styles.pieces}>
						<button type="button" className={styles.mark}></button>
						{this.state.drum.pieces.map((piece) => { return (
							<button type="button" key={`piece-${piece.id}`} className={styles.mark} title={piece.name} onMouseDown={() => this.writeNote(piece.id)}>{piece.abbr}</button>
						)})}
						<button type="button" className={styles.mark}></button>
					</div>
					<div id="beats" className={styles.beats}>
						{this.state.tablature.staff.map((beat, b) => { return (
							<div key={`beat-${b}`} className={`${styles.beat} ${b == this.state.pace ? styles.active : ""} ${(b % this.state.tablature.beats == 0) ? styles.time : ""} ${(b % this.state.tablature.getPrecision() == 0) ? styles.bar : ""}`}>
								<button type="button" className={styles.mark} onMouseDown={() => this.setPace(b)}>{this.state.tablature.getCurrentTime(b) + 1}</button>
								{beat.map((note, n) => { return (
									<button type="button" key={`note-${note}${n}`} className={styles.note} onMouseDown={() => this.writeNote(n, b)}>
										{this.beatIcon(note)}
									</button>
								)})}
								<button type="button" className={styles.mark} onMouseDown={() => this.setPace(b)}>{this.state.tablature.getCurrentTime(b) + 1}</button>
							</div>
						)})}
					</div>
				</div>

				<div className="content is-small pb-2">
					<p>{this.state.pace}/{this.state.tablature.getTotalBeats()}</p>
				</div>
			</div>
		)
	}
}

export default Drummer;
