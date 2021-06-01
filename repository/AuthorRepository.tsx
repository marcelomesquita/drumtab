import { firebase } from "../adapters/firebaseClient";
import Author from "../structures/models/Author";
import AuthorSearch from "../structures/models/search/AuthorSearch";

const authorsRef = firebase.firestore().collection("authors");

export default class AuthorRepository {
	static search = async (search: AuthorSearch) => {
		return authorsRef
			.orderBy('name')
			.startAt(search.name)
			.endAt(search.name + '\uf8ff')
			.get()
			.then((result) => {
				const authors = result.docs.map((author) => {
					return {
						id: author.id,
						name: author.data().name,
					}
				});

				return Promise.resolve(authors);
			})
			.catch((error) => Promise.reject(error));
	}

	static select = async (id: string) => {
		return authorsRef
			.doc(id)
			.get()
			.then((result) => {
				const author = {
					id: result.id,
					name: result.data().name,
				};

				return Promise.resolve(author);
			})
			.catch((error) => Promise.reject(error));
	}

	static insert = (author: Author) => {
		return authorsRef
			.add(author)
			.then((result) => Promise.resolve(result))
			.catch((error) => Promise.reject(error));
	}
}
