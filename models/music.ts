import { ObjectId } from 'bson';
import { Tablature } from './tablature';
import { User } from './user';
import { Artist } from './artist';

export class Music {
	_id?: ObjectId = null;
	name: string = null;
	slug: string = null;
	artist: Artist = new Artist();
	album?: string = null;
	author?: string = null;
	tablature: Tablature = new Tablature();
	createdBy?: User = null;
	createdAt?: Date = null;

	constructor(init = null) {
		Object.assign(this, init);
	}

	isValid = (): boolean => {
		return true;
	}
}
