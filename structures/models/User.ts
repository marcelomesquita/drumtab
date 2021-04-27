import { ObjectId } from 'bson';

export default class User {
	id?: string = null;
	name: string = null;
	email: string = null;
	avatar?: string = null;
	createdAt?: Date = null;
	updatedAt?: Date = null;
	emailVerified?: Date = null;

	constructor(init = null) {
		Object.assign(this, init);
	}

	isValid(): boolean {
		return true;
	}
}
