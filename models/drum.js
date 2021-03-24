import { Piece } from 'models/piece';
import { Howl } from 'howler';

export class Drum {
	pieces = [
		new Piece(0, 'C', 'crash', 'cycdh'),
		new Piece(1, 'H', 'hat', 'cycdh'),
		new Piece(2, 'R', 'ride', 'cycdh'),
		new Piece(3, 'S', 'snare', 'cycdh'),
		new Piece(4, 'T1', 'tom-high', 'cycdh'),
		new Piece(5, 'T2', 'tom-mid', 'cycdh'),
		new Piece(6, 'T3', 'tom-low', 'cycdh'),
		new Piece(7, 'B', 'bass', 'cycdh')
	];

	drumstick = new Howl({src: [`/assets/audios/drum/perc/cycdh/1.wav`]});

	hitNote(note) {
		if (this.pieces[note]) {
			this.pieces[note].hit();
		}
	}
}
