import { firebase } from '../adapters/firebaseClient';

const authorsRef = firebase.firestore().collection('authors');
const usersRef = firebase.firestore().collection('users');

export default class AuthorRepository {
	static listByPopularity = async () => {
		return await this.list('pageCount');
	}

	static list = async (order = 'name', limit = 10) => {
		return authorsRef
			//.orderBy(order)
			.limit(limit)
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

	static exists = async (id) => {
		return authorsRef
			.doc(id)
			.get()
			.then((result) => Promise.resolve(result.exists))
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

	static save = (author, session) => {
		if (!author.isValid()) {
			return Promise.reject('Invalid parameters');
		}

		const authorPlain = {
			name: author.name,
			createdBy: usersRef.doc(session.uid),
			createdAt: new Date(),
			updatedBy: usersRef.doc(session.uid),
			updatedAt: new Date(),
		}

		return authorsRef
			.doc(author.id)
			.set(authorPlain)
			.then((result) => Promise.resolve(result))
			.catch((error) => Promise.reject(error));
	};
}
