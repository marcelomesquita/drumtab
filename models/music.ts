import { ObjectId } from 'bson';
import { Tablature } from './tablature';

export class Music {
	_id: ObjectId;
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

	isValid = (): boolean => {
		return true;
	}
}
