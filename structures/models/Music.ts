import validator from "validator";
import Tablature from "./Tablature";
import User from "./User";
import Artist from "./Artist";
import Author from "./Author";
import Album from "./Album";

export default class Music {
	public id: string = null;
	public name: string = "";
	public artist: Artist = new Artist();
	public album?: Album = new Album();
	public author?: Author = new Author();
	public tablature: Tablature = new Tablature();
	public createdBy?: User = null;
	public createdAt?: Date = null;
	public updatedBy?: User = null;
	public updatedAt?: Date = null;

	constructor(init = null) {
		Object.assign(this, init);

		if (init?.tablature) {
			this.tablature = new Tablature(init.tablature);
		}
	}

	isValid = (): boolean => {
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
	
	validateId = (value = this.id): string => {
		if (validator.isEmpty(value)) {
			return "required";
		}

		if (!validator.isLowercase(value)) {
			return "must be lowercase";
		}

		if (!validator.isLength(value, { min: 3 })) {
			return "too short";
		}

		if (!validator.isSlug(value)) {
			return "must not contain special characters";
		}

		return "";
	}

	validateName = (value = this.name): string => {
		if (validator.isEmpty(value)) {
			return "required";
		}

		return "";
	}

	validateArtist = (value = this.artist): string => {
		if (validator.isEmpty(value.name)) {
			return "required";
		}

		return "";
	}
}
