import { firebase } from "../adapters/firebaseClient";
import Author from "../structures/models/Author";
import AuthorSearch from "../structures/models/search/AuthorSearch";

interface search {
	name?,
	slug?
}

const authorsRef = firebase.firestore().collection("authors");

export default class AuthorRepository {
	static search = async (authorSearch: AuthorSearch) => {
		let search: search = {};

		if (authorSearch?.name) {
			search.name = { "$regex": authorSearch.name, "$options": "i" }
		}

		if (authorSearch?.slug) {
			search.slug = authorSearch.slug
		}

		return authorsRef
			.get()
			.then((result) => {
				let authors = [];

				result.forEach((author) => authors.push({
					id: author.id,
					name: author.data().name,
					slug: author.data().slug
				}));

				return Promise.resolve(authors);
			})
			.catch((error) => Promise.reject(error));
	}

	static select = async (id: string) => {
		return authorsRef
			.doc(id)
			.get()
			.then((result) => {
				const author = new Author({
					id: result.id,
					name: result.data().name,
					slug: result.data().slug,
				});

				return Promise.resolve(author);
			})
			.catch((error) => Promise.reject(error));
	}

	static insert = (author: Author) => {
		return authorsRef
			.withConverter(authorConverter)
			.add(author)
			.then((result) => Promise.resolve(result))
			.catch((error) => Promise.reject(error));
	}
}

const authorConverter = {
	toFirestore: (author) => Object.assign({}, author),
    fromFirestore: (snapshot, options) => {
		return new Author(snapshot.data(options), snapshot.id);
	}
}
