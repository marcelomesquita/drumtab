import validator from 'validator';
import Tablature from '../models/Tablature';
import Artist from '../models/Artist';
import Author from '../models/Author';
import Album from '../models/Album';

export default class Music {
	id = '';
	name = '';
	artist = new Artist();
	album = new Album();
	author = new Author();
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

		if (this.validateArtist()) {
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

	validateArtist(value = this.artist) {
		if (value && validator.isEmpty(value.name)) {
			return 'required';
		}

		return '';
	}
}
