import { firebase } from 'adapters/firebaseClient';

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

	static listByName = async (name) => {
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

	static load = async (id) => {
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

	static save = (author) => {
		return authorsRef
			.doc(author.id)
			.set(Object.assign({}, author))
			.then((result) => Promise.resolve(result))
			.catch((error) => Promise.reject(error));
	};
}
