import React from 'react';
import { FaAdjust, FaBan, FaCircle, FaClock, FaDotCircle, FaLock, FaLockOpen, FaLongArrowAltRight, FaMusic, FaPause, FaPlay, FaStepBackward, FaStepForward, FaStop, FaTachometerAlt, FaUndoAlt } from 'react-icons/fa';
import Drum from '../../models/Drum';
import styles from '../../styles/drummer.module.sass';

export default class Drummer extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			edit: props.edit,
			drum: new Drum(),
			tablature: props.tablature,
			timer: undefined,
			count: 0,
			pace: 0,
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
		if (this.state.timer && this.state.drum.key[event.code] !== 'undefined') {
			this.writeNote(this.state.drum.key[event.code], this.state.pace);
		}
	};

	scroller = () => {
		const staff = document.getElementById('staff');
		const beats = document.getElementById('beats');
		const position = (beats.scrollWidth * this.state.pace) / this.state.tablature.getTotalBeats() - staff.scrollWidth / 2;

		beats.scrollTo({ left: position });
	};

	beatIcon = (beat) => {
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

	counter = () => {
		this.setCount(0);
		this.setState({timer: setInterval(() => {
			if (this.state.count < 2) {
				this.setCount(this.state.count + 1);
				this.state.drum.hitNote('d');
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
	};

	skipNext = () => {
		this.setPace(this.state.tablature.getFirstBeatInNextBar(this.state.pace));
	};

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

		if (this.state.tablature.hitNote(pace, note)) {
			this.state.drum.hitNote(note);
		}

		this.setState(this.state);

		if (this.state.onTablatureChange) {
			this.state.onTablatureChange(this.state.tablature);
		}
	}

	readNotes = (notes) => {
		for (const key in notes) {
			if (notes[key]) {
				this.state.drum.hitNote(key);
			}
		};
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
			<div id='tablature'>
				<div className='columns'>
					<div className='column is-narrow'>
						<button type='button' className='button is-small' title='Stop' onClick={this.stop}><FaStop /></button>
						<button type='button' className='button is-small' title='Previous Bar' onClick={this.skipPrev}><FaStepBackward /></button>
						{this.state.pacerDelay && (<button type='button' className='button is-small' title='Pause' onClick={this.pause}><FaPause /></button>)}
						{!this.state.pacerDelay && (<button type='button' className='button is-small' title='Play' onClick={this.counter}><FaPlay /></button>)}
						<button type='button' className='button is-small' title='Next Bar' onClick={this.skipNext}><FaStepForward /></button>
					</div>

					<div className='column is-narrow'>
						{this.state.repeat && (<button type='button' className='button is-small' title='Continuous Bar' onClick={this.toggleRepeat}><FaUndoAlt /></button>)}
						{!this.state.repeat && (<button type='button' className='button is-small' title='Repeat Bar' onClick={this.toggleRepeat}><FaLongArrowAltRight /></button>)}
						{this.state.scrollLock && (<button type='button' className='button is-small' title='Scroll Lock' onClick={this.toggleScrollLock}><FaLock /></button>)}
						{!this.state.scrollLock && (<button type='button' className='button is-small' title='Scroll Lock' onClick={this.toggleScrollLock}><FaLockOpen /></button>)}
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
									value={this.state.tablature.times}
									onChange={(e) => this.setTimes(e)}
									disabled={!this.state.edit}
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
									value={this.state.tablature.beats}
									onChange={(e) => this.setBeats(e)}
									disabled={!this.state.edit}
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
									value={this.state.tablature.getBeatsPerMin()}
									onChange={(e) => this.setBeatsPerMin(e)}
								/>
								<span className='icon is-left'><FaTachometerAlt /></span>
							</span>
						</div>
					</div>
				</div>

				<div id='staff' className='pb-2'>
					<div id="pieces" className={styles.pieces}>
						<button type='button' className={styles.mark}></button>
						<button type='button' className={styles.mark} onMouseDown={() => this.writeNote('c', this.state.pace)}>c</button>
						<button type='button' className={styles.mark} onMouseDown={() => this.writeNote('h', this.state.pace)}>h</button>
						<button type='button' className={styles.mark} onMouseDown={() => this.writeNote('r', this.state.pace)}>r</button>
						<button type='button' className={styles.mark} onMouseDown={() => this.writeNote('s', this.state.pace)}>s</button>
						<button type='button' className={styles.mark} onMouseDown={() => this.writeNote('th', this.state.pace)}>th</button>
						<button type='button' className={styles.mark} onMouseDown={() => this.writeNote('tm', this.state.pace)}>tm</button>
						<button type='button' className={styles.mark} onMouseDown={() => this.writeNote('tl', this.state.pace)}>tl</button>
						<button type='button' className={styles.mark} onMouseDown={() => this.writeNote('b', this.state.pace)}>b</button>
						<button type='button' className={styles.mark}></button>
					</div>
					<div id='beats' className={styles.beats}>
						{this.state.tablature.staff.map((notes, b) => {
							return (
								<div key={`beat-${b}`} className={`${styles.beat} ${b == this.state.pace && styles.active} ${b % this.state.tablature.beats == 0 && styles.time} ${b % this.state.tablature.getPrecision() == 0 && styles.bar}`}>
									<button type='button' className={styles.mark} onMouseDown={() => this.setPace(b)}>{this.state.tablature.getCurrentTime(b) + 1}</button>
									<button type='button' className={styles.note} onMouseDown={() => this.writeNote('c', b)}>{this.beatIcon(notes.c)}</button>
									<button type='button' className={styles.note} onMouseDown={() => this.writeNote('h', b)}>{this.beatIcon(notes.h)}</button>
									<button type='button' className={styles.note} onMouseDown={() => this.writeNote('r', b)}>{this.beatIcon(notes.r)}</button>
									<button type='button' className={styles.note} onMouseDown={() => this.writeNote('s', b)}>{this.beatIcon(notes.s)}</button>
									<button type='button' className={styles.note} onMouseDown={() => this.writeNote('th', b)}>{this.beatIcon(notes.th)}</button>
									<button type='button' className={styles.note} onMouseDown={() => this.writeNote('tm', b)}>{this.beatIcon(notes.tm)}</button>
									<button type='button' className={styles.note} onMouseDown={() => this.writeNote('tl', b)}>{this.beatIcon(notes.tl)}</button>
									<button type='button' className={styles.note} onMouseDown={() => this.writeNote('b', b)}>{this.beatIcon(notes.b)}</button>
									<button type='button' className={styles.mark} onMouseDown={() => this.setPace(b)}>{this.state.tablature.getCurrentTime(b) + 1}</button>
								</div>
							);
						})}
					</div>
				</div>

				<div className='content is-small pb-2'>
					<p>
						{this.state.pace}/{this.state.tablature.getTotalBeats()}
					</p>
				</div>
			</div>
		);
	}
}
