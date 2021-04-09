import { Howl } from "howler";
import { PIECES } from "../enums/pieces";
import { Piece } from "./piece";

export const PIECE_KEY = {
	KeyC: PIECES.CRASH,
	KeyH: PIECES.HAT,
	//KeyY: PIECES.HAT_CLOSE,
	//KeyN: PIECES.HAT_PEDAL,
	KeyR: PIECES.RIDE,
	KeyS: PIECES.SNARE,
	Digit1: PIECES.TOM_HIGH,
	Digit2: PIECES.TOM_MID,
	Digit3: PIECES.TOM_LOW,
	KeyB: PIECES.BASS
};

export class Drum {
	pieces = [
		new Piece(PIECES.CRASH, 'C', 'crash', 'cycdh'),
		new Piece(PIECES.HAT, 'H', 'hat', 'cycdh'),
		new Piece(PIECES.RIDE, 'R', 'ride', 'cycdh'),
		new Piece(PIECES.SNARE, 'S', 'snare', 'cycdh'),
		new Piece(PIECES.TOM_HIGH, 'T1', 'tom-high', 'cycdh'),
		new Piece(PIECES.TOM_MID, 'T2', 'tom-mid', 'cycdh'),
		new Piece(PIECES.TOM_LOW, 'T3', 'tom-low', 'cycdh'),
		new Piece(PIECES.BASS, 'B', 'bass', 'cycdh')
	];

	stick = new Howl({src: [`/assets/audios/drum/stick/cycdh/normal-0.mp3`]});

	hitNote = (note) => {
		if (this.pieces[note]) {
			this.pieces[note].hit();
		}
	}
}
