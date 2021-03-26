export class Tablature {
	times = 4;
	beats = 4;
	beatsPerMin = 60;
	staff = [];

	constructor(init) {
		Object.assign(this, init);
	}

	getTimes = () => {
		return this.times;
	}

	setTimes = (times) => {
		this.times = times;
	}

	getBeats = () => {
		return this.beats;
	}

	setBeats = (beats) => {
		this.beats = beats;
	}

	getBeatsPerMin = () => {
		return this.beatsPerMin;
	}

	setBeatsPerMin = (beatsPerMin) => {
		this.beatsPerMin = beatsPerMin;
	}

	getBeatsPerSec() {
		return 60 / this.getBeatsPerMin();
	}

	getSpeedPerSec = () => {
		return this.getBeatsPerSec() / this.getBeats() * this.getTimes();
	}

	getSpeedPerTime = () => {
		return this.getSpeedPerSec() / this.getTimes();
	}

	getPrecision = () => {
		return this.getBeats() * this.getTimes();
	}

	getTotalBeats() {
		return this.staff.length;
	}

	getFirstBeatInBar(pace) {
		if (pace == 0) {
			return 0;
		}

		return Math.floor(pace / this.getPrecision()) * this.getPrecision();
	}

	getLastBeatInBar(pace) {
		if (pace == 0) {
			return this.getPrecision();
		}

		return Math.ceil(pace / this.getPrecision()) * this.getPrecision();
	}

	getFirstBeatInPreviousBar(pace) {
		if (pace == 0) {
			return 0;
		}

		return this.getFirstBeatInBar(pace - 1);
	}

	getFirstBeatInNextBar(pace) {
		return (this.getLastBeatInBar(pace + 1) >= this.getTotalBeats()) ? this.getTotalBeats() - 1 : this.getLastBeatInBar(pace + 1);
	}

	getCurrentBar(pace) {
		return Math.floor(pace / this.getPrecision() % this.getPrecision());
	}

	getCurrentTime(pace) {
		return Math.floor(pace / this.beats % this.times);
	}

	addBar() {
		this.staff.push(...Array.from({ length: this.getPrecision() - (this.getTotalBeats() % this.getPrecision()) }, () => [0, 0, 0, 0, 0, 0, 0, 0]));
	}

	hitNote(note, pace) {
		if (!this.staff[pace][note]) {
			this.staff[pace][note] = 1;

			return true;
		} else {
			this.staff[pace][note] = 0;

			return false;
		}
	}
}
