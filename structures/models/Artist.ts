import User from './User';

export default class Artist {
	public id?: string = null;
	public name: string = "";
	public createdBy?: User = null;
	public createdAt?: Date = null;
	public updatedBy?: User = null;
	public updatedAt?: Date = null;

	constructor(init = null) {
		Object.assign(this, init);
	}

	isValid(): boolean {
		return true;
	}
}
