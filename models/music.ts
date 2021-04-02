import { Tablature } from './tablature';

export class Music {
	id: number;
	title: string;
	artist: string;
	album: string;
	author: string;
	tablature: Tablature = new Tablature();
	created_by: string;
	created_at: Date = new Date();

	constructor(init = null) {
		Object.assign(this, init);
	}
}
