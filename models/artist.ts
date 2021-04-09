import { ObjectId } from 'bson';

export class Artist {
	_id?: ObjectId = null;
	name: string = null;
	slug: string = null;

	constructor(init = null) {
		Object.assign(this, init);
	}

	isValid = (): boolean => {
		return true;
	}
}
