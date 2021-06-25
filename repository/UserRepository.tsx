import { firebase } from 'adapters/firebaseClient';
import User from 'structures/models/User';

const usersRef = firebase.firestore().collection('users');

export default class UserRepository {
	static load = (id: string) => {
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

	static save = (user: User) => {
		user.updatedAt = new Date();

		return usersRef
			.doc(user.id)
			.set(Object.assign({}, user))
			.then((result) => Promise.resolve(result))
			.catch((error) => Promise.reject(error));
	};
}
