import { firebase } from '../adapters/firebaseClient';

const artistsRef = firebase.firestore().collection('artists');
const usersRef = firebase.firestore().collection('users');

export default class ArtistRepository {
	static listByPopularity = async () => {
		return artistsRef
			.get()
			.then((result) => {
				const artists = result.docs.map((artist) => {
					return {
						id: artist.id,
						name: artist.data().name,
					};
				});

				return Promise.resolve(artists);
			})
			.catch((error) => Promise.reject(error));
	};

	static listByName = async (name) => {
		return artistsRef
			.orderBy('name')
			.startAt(name)
			.endAt(name + '\uf8ff')
			.get()
			.then((result) => {
				const artists = result.docs.map((artist) => {
					return {
						id: artist.id,
						name: artist.data().name,
					};
				});

				return Promise.resolve(artists);
			})
			.catch((error) => Promise.reject(error));
	};

	static exists = async (id) => {
		return artistsRef
			.doc(id)
			.get()
			.then((result) => Promise.resolve(result.exists))
			.catch((error) => Promise.reject(error));
	};

	static load = async (id) => {
		return artistsRef
			.doc(id)
			.get()
			.then((result) => {
				const artist = {
					id: result.id,
					name: result.data().name,
				};

				return Promise.resolve(artist);
			})
			.catch((error) => Promise.reject(error));
	};

	static save = (artist, session) => {
		if (!artist.isValid()) {
			return Promise.reject('Invalid parameters');
		}

		const artistPlain = {
			name: artist.name,
			createdBy: usersRef.doc(session.uid),
			createdAt: new Date(),
			updatedBy: usersRef.doc(session.uid),
			updatedAt: new Date(),
		}

		return artistsRef
			.doc(artist.id)
			.set(artistPlain)
			.then((result) => Promise.resolve(result))
			.catch((error) => Promise.reject(error));
	};
}
