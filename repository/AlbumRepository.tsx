import { firebase } from "../adapters/firebaseClient";
import Album from "../structures/models/Album";
import AlbumSearch from "../structures/models/search/AlbumSearch";

const albumsRef = firebase.firestore().collection("albums");

export default class AlbumRepository {
	static search = async (search: AlbumSearch) => {
		return albumsRef
			.orderBy('name')
			.startAt(search.name)
			.endAt(search.name + '\uf8ff')
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

	static select = async (id: string) => {
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

	static insert = (album: Album) => {
		return albumsRef
			.add(album)
			.then((result) => Promise.resolve(result))
			.catch((error) => Promise.reject(error));
	}
}
