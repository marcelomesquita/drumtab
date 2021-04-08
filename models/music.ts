import { ObjectId } from 'bson';
import { Tablature } from './tablature';
import { User } from './user';

export class Music {
	_id?: ObjectId = new ObjectId();
	title: string = "";
	slug: string = "";
	artist?: string = "";
	album?: string = "";
	author?: string = "";
	tablature: Tablature = new Tablature();
	createdBy?: User = undefined;
	createdAt?: Date = undefined;

	constructor(init = null) {
		Object.assign(this, init);
	}

	isValid = (): boolean => {
		return true;
	}
}
