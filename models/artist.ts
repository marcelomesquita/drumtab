import { ObjectId } from 'bson';
import User from './user';

export default class Artist {
	public _id?: ObjectId = null;
	public name: string = "";
	public slug: string = "";
	public createdBy?: User = null;
	public createdAt?: Date = null;
	public updatedBy?: User = null;
	public updatedAt?: Date = null;

	constructor(init = null) {
		Object.assign(this, init);
	}

	isValid = (): boolean => {
		return true;
	}
}
