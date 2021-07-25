import { firebase } from '../adapters/firebaseClient';

const albumsRef = firebase.firestore().collection('albums');
const usersRef = firebase.firestore().collection('users');

export default class AlbumRepository {
	static listByPopularity = async () => {
		return await this.list('pageCount');
	}

	static list = async (order = 'name', limit = 10) => {
		return albumsRef
			//.orderBy(order)
			.limit(limit)
			.get()
			.then((result) => {
				const albums = result.docs.map((album) => {
					return {
						id: album.id,
						name: album.data().name,
					};
				});

				return Promise.resolve(albums);
			})
			.catch((error) => Promise.reject(error));
	};

	static listByName = async (name) => {
		return albumsRef
			.orderBy('name')
			.startAt(name)
			.endAt(name + '\uf8ff')
			.get()
			.then((result) => {
				const albums = result.docs.map((album) => {
					return {
						id: album.id,
						name: album.data().name,
					};
				});

				return Promise.resolve(albums);
			})
			.catch((error) => Promise.reject(error));
	};

	static exists = async (id) => {
		return albumsRef
			.doc(id)
			.get()
			.then((result) => Promise.resolve(result.exists))
			.catch((error) => Promise.reject(error));
	};

	static load = async (id) => {
		return albumsRef
			.doc(id)
			.get()
			.then((result) => {
				const album = {
					id: result.id,
					name: result.data().name,
				};

				return Promise.resolve(album);
			})
			.catch((error) => Promise.reject(error));
	};

	static save = (album, session) => {
		if (!album.isValid()) {
			return Promise.reject('Invalid parameters');
		}

		const albumPlain = {
			name: album.name,
			createdBy: usersRef.doc(session.uid),
			createdAt: new Date(),
			updatedBy: usersRef.doc(session.uid),
			updatedAt: new Date(),
		}

		return albumsRef
			.doc(album.id)
			.set(albumPlain)
			.then((result) => Promise.resolve(result))
			.catch((error) => Promise.reject(error));
	};
}
