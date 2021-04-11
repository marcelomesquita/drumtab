import { ObjectId } from "bson";
import { Tablature } from "./tablature";
import { User } from "./user";
import { Artist } from "./artist";
import validator from "validator";

export class Music {
	public _id?: ObjectId = null;
	public name: string = "";
	public slug: string = "";
	public artist: Artist = new Artist();
	public album?: string = "";
	public author?: string = "";
	public tablature: Tablature = new Tablature();
	public createdBy?: User = null;
	public createdAt?: Date = null;
	public updatedBy?: User = null;
	public updatedAt?: Date = null;

	constructor(init = null) {
		Object.assign(this, init);
	}

	isValid = (): boolean => {
		if (this.validateName()) {
			return false;
		}

		if (this.validateSlug()) {
			return false;
		}

		if (this.validateArtist()) {
			return false;
		}

		return true;
	}

	validateName = (value = this.name): string => {
		if (validator.isEmpty(value)) {
			return "required";
		}

		return "";
	}

	validateSlug = (value = this.slug): string => {
		if (validator.isEmpty(value)) {
			return "required";
		}

		if (!validator.isLowercase(value)) {
			return "must be lowercase";
		}

		if (!validator.isSlug(value)) {
			return "must not contain special characters";
		}

		return "";
	}

	validateArtist = (value = this.artist.name): string => {
		if (validator.isEmpty(value)) {
			return "required";
		}

		return "";
	}
}
