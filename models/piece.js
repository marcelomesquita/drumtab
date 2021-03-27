import { Howl } from 'howler';

export class Piece {
	id;
	abbr;
	name;
	brand;
	type;
	audios = [];
	variation = 0;

	constructor(id, abbr, name, brand, type = 'normal') {
		this.id = id;
		this.abbr = abbr;
		this.name = name;
		this.brand = brand;
		this.type = type;

		this.audios.push(new Howl({
			src: [`/assets/audios/drum/${this.name}/${this.brand}/${this.type}-0.mp3`]
		}));
	}

	hit() {
		this.audios[this.nextVariation()].play();
	}

	nextVariation() {
		this.variation = (this.variation == this.audios.length - 1) ? 0 : ++this.variation;

		return this.variation;
	}
}
