import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdjust, faBan, faCircle, faClock, faDotCircle, faLock, faMusic, faPause, faPlay, faStepBackward, faStepForward, faStop, faTachometerAlt, faUndo } from '@fortawesome/free-solid-svg-icons';
import { faCircle as farCircle } from '@fortawesome/free-regular-svg-icons'
import { PIECE_KEY } from 'models/drum';

class Drummer extends React.Component {
	state = {};

	constructor(props) {
		super(props);

		this.state = {
			drum: props.drum,
			tablature: props.tablature,
			timer: undefined,
			pace: 0,
			count: 0,
			edit: props.edit,
			repeat: true,
			scrollLock: true
		}
	}

	componentDidMount = () => {
		if (typeof document !== 'undefined') {
			document.addEventListener('keydown', this.handleKeyboardEvent);
		}
	}

	componentWillUnmount = () => {
		if (typeof document !== 'undefined') {
			document.removeEventListener('keydown', this.handleKeyboardEvent);
		}
	}

	handleKeyboardEvent = (event) => {
		if (PIECE_KEY[event.code] !== undefined) {
			this.hitNote(PIECE_KEY[event.code], this.state.pace);
		}
	}

	scroller = () => {
		var staff = document.getElementById('staff');
		var beats = document.getElementById('beats');
		var position = (beats.scrollWidth * this.state.pace / this.state.tablature.getTotalBeats()) - (staff.scrollWidth / 2);

		beats.scrollTo({left: position});
	}

	beatIcon = (beat) => {
		switch (beat) {
			case 1:
				return <FontAwesomeIcon icon={faCircle} />
			case 2:
				return <FontAwesomeIcon icon={faAdjust} />
			case 3:
				return <FontAwesomeIcon icon={faDotCircle} />
			case 4:
				return <FontAwesomeIcon icon={farCircle} />
			case 5:
				return <FontAwesomeIcon icon={faBan} />
		}
	}

	playPause = () => {
		if (this.state.timer) {
			this.pause();
		} else {
			this.counter();
		}
	}

	counter = () => {
		this.setCount(0);
		this.setState({timer: setInterval(() => {
			if (this.state.count < 2) {
				this.setCount(++this.state.count);

				this.state.drum.stick.play();
			} else {
				clearInterval(this.state.timer);

				this.play();
			}
		}, this.state.tablature.getSpeedPerSec() * 1000)});
	}

	play = () => {
		this.setState({timer: setInterval(() => {
			this.nextPace();
			this.hitNotes(this.state.tablature.staff[this.state.pace]);
		}, this.state.tablature.getSpeedPerTime() * 1000)});

		this.hitNotes(this.state.tablature.staff[this.state.pace]);
	}

	pause = () => {
		clearInterval(this.state.timer);
		this.setState({timer: undefined});
	}

	stop = () => {
		clearInterval(this.state.timer);
		this.setState({timer: undefined});
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
			this.setPace(this.state.tablature.getFirstBeatInBar(this.state.pace));
		} else {
			if (this.state.pace == this.state.tablature.getTotalBeats() - 1) {
				this.state.tablature.addBar();

				this.setState(this.state);
			}

			this.setPace(++this.state.pace);
		}
	}

	hitNote = (note, pace = this.state.pace) => {
		if (this.state.tablature.hitNote(note, pace)) {
			this.state.drum.hitNote(note);
		}

		this.setState(this.state);
	}

	hitNotes = (notes) => {
		notes.forEach((note, index) => {
			if (note) {
				this.state.drum.hitNote(index);
			}
		});
	}

	toggleRepeat = () => {
		this.setState({repeat: !this.state.repeat});
	}

	toggleScrollLock = () => {
		this.setState({scrollLock: !this.state.scrollLock});
	}

	setCount = (count) => {
		this.state.count = count;
		this.setState(this.state);
	}

	setPace = (pace) => {
		this.state.pace = pace;
		this.setState(this.state);

		if (this.state.scrollLock) {
			this.scroller();
		}
	}

	setBeats = (e) => {
		var value = parseInt(e.target.value ? e.target.value : 0);
		var min = parseInt(e.target.min);
		var max = parseInt(e.target.max);

		if (value < min) {
			this.state.tablature.setBeats(min);
		} else if (value > max) {
			this.state.tablature.setBeats(max);
		} else {
			this.state.tablature.setBeats(value);
		}

		this.setState({tablature: this.state.tablature});
	}

	setTimes = (e) => {
		var value = parseInt(e.target.value ? e.target.value : 0);
		var min = parseInt(e.target.min);
		var max = parseInt(e.target.max);

		if (value < min) {
			this.state.tablature.setTimes(min);
		} else if (value > max) {
			this.state.tablature.setTimes(max);
		} else {
			this.state.tablature.setTimes(value);
		}

		this.setState(this.state);
	}

	setBeatsPerMin = (e) => {
		var value = parseInt(e.target.value ? e.target.value : 0);
		var min = parseInt(e.target.min);
		var max = parseInt(e.target.max);

		if (value < min) {
			this.state.tablature.setBeatsPerMin(min);
		} else if (value > max) {
			this.state.tablature.setBeatsPerMin(max);
		} else {
			this.state.tablature.setBeatsPerMin(value);
		}

		this.setState(this.state);
	}

	render() {
		return (
			<div id="tablature">
				<div className="controls columns">
					<div className="column is-narrow">
						<button className="button is-small" title="Stop" onClick={this.stop}><FontAwesomeIcon icon={faStop} /></button>
						<button className="button is-small" title="Previous Bar" onClick={this.skipPrev}><FontAwesomeIcon icon={faStepBackward} /></button>
						<button className="button is-small" title="Play/Pause" onClick={this.playPause}><FontAwesomeIcon icon={this.state.timer ? faPause : faPlay} /></button>
						<button className="button is-small" title="Next Bar" onClick={this.skipNext}><FontAwesomeIcon icon={faStepForward} /></button>
					</div>

					<div className="column is-narrow">
						<button className={`button is-small ${this.state.repeat ? "is-light is-active" : ""}`} title="Repeat Bar" onClick={this.toggleRepeat}><FontAwesomeIcon icon={faUndo} /></button>
						<button className={`button is-small ${this.state.scrollLock ? "is-light is-active" : ""}`} title="Scroll Lock" onClick={this.toggleScrollLock}><FontAwesomeIcon icon={faLock} /></button>
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
									onChange={(e) => this.setTimes(e)} />
								<span className="icon is-small is-left">
									<FontAwesomeIcon icon={faClock} />
								</span>
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
									onChange={(e) => this.setBeats(e)} />
								<span className="icon is-small is-left">
									<FontAwesomeIcon icon={faMusic} />
								</span>
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
								<span className="icon is-small is-left">
									<FontAwesomeIcon icon={faTachometerAlt} />
								</span>
							</span>
						</div>
					</div>
				</div>

				<div id="staff" className="staff">
					<div className="pieces">
						<button className="mark"></button>
						{this.state.drum.pieces.map((piece) => { return (
							<button key={`piece-${piece.id}`} className="mark" title={piece.name} onMouseDown={() => this.hitNote(piece.id)}>{piece.abbr}</button>
						)})}
						<button className="mark"></button>
					</div>
					<div id="beats" className="beats">
						{this.state.tablature.staff.map((beat, b) => { return (
							<div key={`beat-${b}`} className={`beat ${b == this.state.pace ? "active" : ""} ${(b % this.state.tablature.beats == 0) ? "time" : ""} ${(b % this.state.tablature.getPrecision() == 0) ? "bar" : ""}`}>
								<button className="mark" onMouseDown={() => this.setPace(b)}>{this.state.tablature.getCurrentTime(b) + 1}</button>
								{beat.map((note, n) => { return (
									<button key={`note-${note}${n}`} className="note" onMouseDown={() => this.hitNote(n, b)}>
										{this.beatIcon(note)}
									</button>
								)})}
								<button className="mark" onMouseDown={() => this.setPace(b)}>{this.state.tablature.getCurrentTime(b) + 1}</button>
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
