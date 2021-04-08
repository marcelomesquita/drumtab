import { ObjectId } from 'bson';
import { Music } from './music';

export class User {
	_id?: ObjectId = null;
	name: string = "";
	email: string = "";
	image?: string = "";
	createdAt?: Date = new Date();
	updatedAt?: Date = new Date();
	emailVerified?: Date = new Date();

	constructor(init = null) {
		Object.assign(this, init);
	}

	isValid = (): boolean => {
		return true;
	}
}
