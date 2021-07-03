import { Howl } from 'howler';

export default class Piece {
	name = null;
	brand = null;
	model = null;
	audios = [];
	variation = 0;

	constructor(name, brand, model = 'normal') {
		this.name = name;
		this.brand = brand;
		this.model = model;

		this.audios.push(
			new Howl({
				src: [`/assets/audios/drum/${this.name}/${this.brand}/${this.model}-0.mp3`],
				preload: true,
			})
		);
	}

	hit(type) {
		this.audios[this.nextVariation()].play();
	}

	nextVariation() {
		this.variation = this.variation == this.audios.length - 1 ? 0 : ++this.variation;

		return this.variation;
	}
}
