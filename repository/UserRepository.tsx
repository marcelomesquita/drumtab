import { firebase } from "../adapters/firebaseClient";
import User from "../structures/models/User";
import UserSearch from "../structures/models/search/UserSearch";

interface search {
	name?,
	slug?
}

const usersRef = firebase.firestore().collection("users");

export default class UserRepository {
	static search = async (userSearch: UserSearch) => {
		let search: search = {};

		if (userSearch?.name) {
			search.name = { "$regex": userSearch.name, "$options": "i" }
		}

		if (userSearch?.slug) {
			search.slug = userSearch.slug
		}

		return usersRef
			.get()
			.then((result) => {
				const users = result.docs.map((user) => {
					return {
						id: user.id,
						name: user.data().name,
						slug: user.data().slug,
					}
				});

				return Promise.resolve(users);
			})
			.catch((error) => Promise.reject(error));
	}

	static select = (id: string) => {
		return usersRef
			.doc(id)
			.get()
			.then((result) => Promise.resolve(result))
			.catch((error) => Promise.reject(error));
	}

	static insert = (user: User) => {
		return usersRef
			.doc(user.id)
			.set(Object.assign({}, user))
			.then((result) => Promise.resolve(result))
			.catch((error) => Promise.reject(error));
	}
}
