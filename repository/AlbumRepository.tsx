import { firebase } from "../adapters/firebaseClient";
import Album from "../structures/models/Album";

const albumsRef = firebase.firestore().collection("albums");

export default class AlbumRepository {
	static listByPopularity = async () => {
		return albumsRef
			.get()
			.then((result) => {
				const albums = result.docs.map((album) => {
					return {
						id: album.id,
						name: album.data().name,
					}
				});

				return Promise.resolve(albums);
			})
			.catch((error) => Promise.reject(error));
	}

	static listByName = async (name: string) => {
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
					}
				});

				return Promise.resolve(albums);
			})
			.catch((error) => Promise.reject(error));
	}

	static load = async (id: string) => {
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
	}

	static save = (album: Album) => {
		return albumsRef
			.doc(album.id)
			.set(Object.assign({}, album))
			.then((result) => Promise.resolve(result))
			.catch((error) => Promise.reject(error));
	}
}
