import { Piece } from 'models/piece';
import { Howl } from 'howler';

export const DRUM_PIECES = {
	CRASH: 0,
	HAT: 1,
	HAT_CLOSE: 11,
	HAT_PEDAL: 12,
	RIDE: 2,
	RIDE_CORE: 21,
	SNARE: 3,
	SNARE_OFF: 31,
	SNARE_RIM: 32,
	SNARE_FLAM: 33,
	TOM_HIGH: 4,
	TOM_MID: 5,
	TOM_LOW: 6,
	BASS: 7
}

export const PIECE_KEY = {
	KeyC: DRUM_PIECES.CRASH,
	KeyH: DRUM_PIECES.HAT,
	KeyY: DRUM_PIECES.HAT_CLOSE,
	KeyN: DRUM_PIECES.HAT_PEDAL,
	KeyR: DRUM_PIECES.RIDE,
	KeyS: DRUM_PIECES.SNARE,
	Digit1: DRUM_PIECES.TOM_HIGH,
	Digit2: DRUM_PIECES.TOM_MID,
	Digit3: DRUM_PIECES.TOM_LOW,
	KeyB: DRUM_PIECES.BASS
};

export class Drum {
	pieces = [
		new Piece(DRUM_PIECES.CRASH, 'C', 'crash', 'cycdh'),
		new Piece(DRUM_PIECES.HAT, 'H', 'hat', 'cycdh'),
		new Piece(DRUM_PIECES.RIDE, 'R', 'ride', 'cycdh'),
		new Piece(DRUM_PIECES.SNARE, 'S', 'snare', 'cycdh'),
		new Piece(DRUM_PIECES.TOM_HIGH, 'T1', 'tom-high', 'cycdh'),
		new Piece(DRUM_PIECES.TOM_MID, 'T2', 'tom-mid', 'cycdh'),
		new Piece(DRUM_PIECES.TOM_LOW, 'T3', 'tom-low', 'cycdh'),
		new Piece(DRUM_PIECES.BASS, 'B', 'bass', 'cycdh')
	];

	drumstick = new Howl({src: [`/assets/audios/drum/stick/cycdh/normal-0.mp3`]});

	hitNote = (note) => {
		if (this.pieces[note]) {
			this.pieces[note].hit();
		}
	}

	handleKeyboardEvent = (event) => {
		if (PIECE_KEY[event.code] !== undefined) {
			this.hitNote(PIECE_KEY[event.code]);
		}
	}
}
