import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdjust, faBan, faCircle, faClock, faDotCircle, faMusic, faPause, faPlay, faStepBackward, faStepForward, faStop, faTachometerAlt, faUndo } from '@fortawesome/free-solid-svg-icons';
import { faCircle as farCircle } from '@fortawesome/free-regular-svg-icons'

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
			repeat: true
		}
	}

	componentDidMount() {
		if (typeof document !== 'undefined') {
			document.addEventListener('keydown', this.handleKeyboardEvent.bind(this));
		}
	}

	componentWillUnmount() {
		if (typeof document !== 'undefined') {
			document.removeEventListener('keydown', this.handleKeyboardEvent.bind(this));
		}
	}

	handleKeyboardEvent(event) {
		const KEY_CODE = {
			KeyC: 0,
			KeyH: 1,
			KeyR: 2,
			KeyS: 3,
			Digit1: 4,
			Digit2: 5,
			Digit3: 6,
			KeyB: 7
		};

		if (KEY_CODE[event.code] !== undefined) {
			this.state.drum.hitNote(KEY_CODE[event.code]);
		}
	}

	beatIcon(beat) {
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

	playPause() {
		if (this.state.timer) {
			this.pause();
		} else {
			this.counter();
		}
	}

	counter() {
		this.setState({count: 0});
		this.setState({timer: setInterval(() => {
			if (this.state.count < 2) {
				this.setState({count: this.state.count + 1});

				this.state.drum.drumstick.play();
			} else {
				clearInterval(this.state.timer);

				this.play();
			}
		}, this.state.tablature.getBeatsPerSec() * 1000)});
	}

	play() {
		this.hitNotes(this.state.tablature.staff[this.state.pace]);

		this.setState({timer: setInterval(() => {
			this.nextPace();

			this.hitNotes(this.state.tablature.staff[this.state.pace]);
		}, this.state.tablature.getBeatsPerTime() * 1000)});
	}

	pause() {
		clearInterval(this.state.timer);
		this.setState({timer: undefined});
	}

	stop() {
		clearInterval(this.state.timer);
		this.setState({timer: undefined});
		this.setState({pace: 0});
	}

	skipPrev() {
		this.setState({pace: this.state.tablature.getFirstBeatInPreviousBar(this.state.pace)});
	}

	skipNext() {
		this.setState({pace: this.state.tablature.getFirstBeatInNextBar(this.state.pace)});
	}

	nextPace() {
		if (this.state.repeat && this.state.pace == this.state.tablature.getLastBeatInBar(this.state.pace) - 1) {
			this.setState({pace: this.state.tablature.getFirstBeatInBar(this.state.pace) - 1});
		}

		if (this.state.pace == this.state.tablature.getTotalBeats() - 1) {
			this.state.tablature.addBar();
		}

		this.setState({pace: this.state.pace + 1});
	}

	toggleRepeat() {
		this.setState({repeat: !this.state.repeat});
	}

	hitNote(note, pace = this.state.pace) {
		if (this.state.tablature.hitNote(note, pace)) {
			this.state.drum.hitNote(note);
		}

		this.setState({tablature: this.state.tablature});
	}

	hitNotes(notes) {
		notes.forEach((note, index) => {
			if (note) {
				this.state.drum.hitNote(index);
			}
		});
	}

	render() {
		return (
			<div className="tablature">
				<div className="controls columns">
					<div className="column is-narrow">
						<button className="button is-small" title="Stop" onClick={() => this.stop()}>
							<FontAwesomeIcon icon={faStop} />
						</button>

						<button className="button is-small" title="Previous Bar" onClick={() => this.skipPrev()}>
							<FontAwesomeIcon icon={faStepBackward} />
						</button>

						<button className="button is-small" title="Play/Pause" onClick={() => this.playPause()}>
							<FontAwesomeIcon icon={this.state.timer ? faPause : faPlay} />
						</button>

						<button className="button is-small" title="Next Bar" onClick={() => this.skipNext()}>
							<FontAwesomeIcon icon={faStepForward} />
						</button>

						<button className={`button is-small ${this.state.repeat ? "is-active" : ""}`} title="Repeat Bar" onClick={() => this.toggleRepeat()}>
							<FontAwesomeIcon icon={faUndo} />
						</button>
					</div>

					<div className="column is-narrow">
						<div className="field is-grouped">
							<span className="control has-icons-left">
								<input className="input is-small" type="number" placeholder="Times" min="1" max="16" style={{width: "80px"}} value={this.state.tablature.times} readOnly />
								<span className="icon is-small is-left">
									<FontAwesomeIcon icon={faClock} />
								</span>
							</span>

							<span className="control has-icons-left">
								<input className="input is-small" type="number" placeholder="Times" min="1" max="16" style={{width: "80px"}} value={this.state.tablature.beats} readOnly />
								<span className="icon is-small is-left">
									<FontAwesomeIcon icon={faMusic} />
								</span>
							</span>

							<span className="control has-icons-left">
								<input className="input is-small" type="number" placeholder="Times" min="1" max="300" style={{width: "80px"}} value={this.state.tablature.beatsPerMin} readOnly />
								<span className="icon is-small is-left">
									<FontAwesomeIcon icon={faTachometerAlt} />
								</span>
							</span>
						</div>
					</div>
				</div>

				<div className="staff">
					<div className="pieces">
						<button className="mark"></button>
						{this.state.drum.pieces.map((piece) => { return (
							<button key={`piece-${piece.id}`} className="mark" title={piece.name} onMouseDown={() => this.hitNote(piece.id)}>
								{piece.abbr}
							</button>
						)})}
						<button className="mark"></button>
					</div>

					<div className="beats">
						{this.state.tablature.staff.map((beat, b) => { return (
							<div key={`beat-${b}`} className={`beat ${b == this.state.pace ? "active" : ""}`}>
								<button className="mark" onMouseDown={() => this.setState({pace: b})}>{this.state.tablature.getCurrentTime(b) + 1}</button>
								{beat.map((note, n) => { return (
									<button key={`note-${note}${n}`} className="note" onMouseDown={() => this.hitNote(n, b)}>
										{this.beatIcon(note)}
									</button>
								)})}
								<button className="mark" onMouseDown={() => this.setState({pace: b})}>{this.state.tablature.getCurrentTime(b) + 1}</button>
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
