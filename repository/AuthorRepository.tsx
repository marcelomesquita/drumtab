import { firebase } from 'adapters/firebaseClient';
import Author from 'structures/models/Author';

const authorsRef = firebase.firestore().collection('authors');

export default class AuthorRepository {
	static listByPopularity = async () => {
		return authorsRef
			.get()
			.then((result) => {
				const authors = result.docs.map((author) => {
					return {
						id: author.id,
						name: author.data().name,
					};
				});

				return Promise.resolve(authors);
			})
			.catch((error) => Promise.reject(error));
	};

	static listByName = async (name: string) => {
		return authorsRef
			.orderBy('name')
			.startAt(name)
			.endAt(name + '\uf8ff')
			.get()
			.then((result) => {
				const authors = result.docs.map((author) => {
					return {
						id: author.id,
						name: author.data().name,
					};
				});

				return Promise.resolve(authors);
			})
			.catch((error) => Promise.reject(error));
	};

	static load = async (id: string) => {
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
	};

	static save = (author: Author) => {
		return authorsRef
			.doc(author.id)
			.set(Object.assign({}, author))
			.then((result) => Promise.resolve(result))
			.catch((error) => Promise.reject(error));
	};
}
