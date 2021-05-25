import { firebase } from "../adapters/firebaseClient";
import Album from "../structures/models/Album";
import AlbumSearch from "../structures/models/search/AlbumSearch";

interface search {
	name?,
	slug?
}

const albumsRef = firebase.firestore().collection("albums");

export default class AlbumRepository {
	static search = async (albumSearch: AlbumSearch) => {
		let search: search = {};

		if (albumSearch?.name) {
			search.name = { "$regex": albumSearch.name, "$options": "i" }
		}

		if (albumSearch?.slug) {
			search.slug = albumSearch.slug
		}

		return albumsRef
			.get()
			.then((result) => {
				const albums = result.docs.map((album) => {
					return {
						id: album.id,
						name: album.data().name,
						slug: album.data().slug,
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
				const album = new Album({
					id: result.id,
					name: result.data().name,
					slug: result.data().slug,
				});

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
