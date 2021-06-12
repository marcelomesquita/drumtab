export default class User {
	public id?: string = null;
	public name: string = null;
	public email: string = null;
	public avatar?: string = null;
	public createdAt?: Date = null;
	public updatedAt?: Date = null;

	constructor(init = null) {
		Object.assign(this, init);
	}

	isValid(): boolean {
		return true;
	}
}
