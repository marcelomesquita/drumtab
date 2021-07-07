export default class User {
	id = null;
	name = null;
	email = null;
	avatar = null;
	createdAt = null;
	updatedAt = null;

	constructor(init = null) {
		Object.assign(this, init);
	}

	isValid() {
		return true;
	}
}
