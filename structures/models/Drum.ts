import Piece from "./Piece";

export default class Drum {
	public d = new Piece('stick', 'cycdh');
	public c = new Piece('crash', 'cycdh');
	public h = new Piece('hat', 'cycdh');
	public r = new Piece('ride', 'cycdh');
	public s = new Piece('snare', 'cycdh');
	public th = new Piece('tom-high', 'cycdh');
	public tm = new Piece('tom-mid', 'cycdh');
	public tl = new Piece('tom-low', 'cycdh');
	public b = new Piece('bass', 'cycdh');
	
	public key = {
		KeyC: 'c',
		KeyH: 'h',
		//KeyY: 'h',
		//KeyN: 'h',
		KeyR: 'r',
		KeyS: 's',
		Digit1: 'th',
		Digit2: 'tm',
		Digit3: 'tl',
		KeyB: 'b'
	};

	hitNote(note, type = 1) {
		if (this[note]) {
			this[note].hit(type);
		}
	}

	hitStick(type) {
		this.d.hit(type);
	}

	hitCrash(type) {
		this.c.hit(type);
	}

	hitHat(type) {
		this.h.hit(type);
	}

	hitRide(type) {
		this.r.hit(type);
	}

	hitSnare(type) {
		this.s.hit(type);
	}

	hitTomHigh(type) {
		this.th.hit(type);
	}

	hitTomMid(type) {
		this.tm.hit(type);
	}

	hitTomLow(type) {
		this.tl.hit(type);
	}

	hitBass(type) {
		this.b.hit(type);
	}
}
