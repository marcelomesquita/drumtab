export default class Author {
	id = null;
	name = "";
	createdBy = null;
	createdAt = null;
	updatedBy = null;
	updatedAt = null;

	constructor(init = null) {
		Object.assign(this, init);
	}

	isValid() {
		return true;
	}
}