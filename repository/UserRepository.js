import { firebase } from '../adapters/firebaseClient';

const usersRef = firebase.firestore().collection('users');

export default class UserRepository {
	static exists = (id) => {
		return usersRef
			.doc(id)
			.get()
			.then((result) => Promise.resolve(result.exists))
			.catch((error) => Promise.reject(error));
	};

	static load = (id) => {
		return usersRef
			.doc(id)
			.get()
			.then((result) => {
				const user = {
					id: result.id,
					name: result.data().name,
					email: result.data().email,
					avatar: result.data().avatar,
				};

				return Promise.resolve(user);
			})
			.catch((error) => Promise.reject(error));
	};

	static save = (user) => {
		user.updatedAt = new Date();

		return usersRef
			.doc(user.id)
			.set(Object.assign({}, user))
			.then((result) => Promise.resolve(result))
			.catch((error) => Promise.reject(error));
	};
}
