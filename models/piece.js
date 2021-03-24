import { Howl } from 'howler';

export class Piece {
	id;
	abbr;
	name;
	type;
	audios = [];
	variation = 0;

	constructor(id, abbr, name, type) {
		this.id = id;
		this.abbr = abbr;
		this.name = name;
		this.type = type;

		this.audios.push(new Howl({src: [`/assets/audios/drum/${this.name}/${this.type}/1.wav`]}));
	}

	hit() {
		this.audios[this.nextVariation()].play();
	}

	nextVariation() {
		this.variation = (this.variation == this.audios.length - 1) ? 0 : ++this.variation;

		return this.variation;
	}
}
