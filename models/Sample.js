import validator from 'validator';
import Tablature from './Tablature';

export default class Sample {
	id = '';
	name = '';
	tablature = new Tablature();
	createdBy = null;
	createdAt = null;
	updatedBy = null;
	updatedAt = null;

	constructor(init = null) {
		Object.assign(this, init);

		if (init?.tablature) {
			this.tablature = new Tablature(init.tablature);
		}
	}

	isValid() {
		if (this.validateId()) {
			return false;
		}

		if (this.validateName()) {
			return false;
		}

		return true;
	}

	validateId(value = this.id) {
		if (validator.isEmpty(value)) {
			return 'required';
		}

		if (!validator.isLowercase(value)) {
			return 'must be lowercase';
		}

		if (!validator.isLength(value, { min: 3 })) {
			return 'too short';
		}

		if (!validator.isSlug(value)) {
			return 'must not contain special characters';
		}

		return '';
	}

	validateName(value = this.name) {
		if (validator.isEmpty(value)) {
			return 'required';
		}

		return '';
	}
}
