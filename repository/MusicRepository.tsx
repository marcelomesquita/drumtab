import { firebase } from "../adapters/firebaseClient";
import Music from "../structures/models/Music";
import MusicSearch from "../structures/models/search/MusicSearch";

interface search {
	name?,
}

const musicsRef = firebase.firestore().collection("musics");

export default class MusicRepository {
	static search = async (musicSearch: MusicSearch) => {
		let search: search = {};

		if (musicSearch?.name) {
			search.name = { "$regex": musicSearch.name, "$options": "i" }
		}

		return musicsRef
			.get()
			.then(async (result) => {
				const musics = await Promise.all(
					result.docs.map(async (music) => {
						const [album, artist, author, createdBy, updatedBy] = await Promise.all([
							music.data().album.get(),
							music.data().artist.get(),
							music.data().author.get(),
							music.data().createdBy.get(),
							music.data().updatedBy.get(),
						]);

						return {
							id: music.id,
							name: music.data().name,
							tablature: music.data().tablature,
							album: {
								id: album.id,
								name: album.data().name,
							},
							artist: {
								id: artist.id,
								name: artist.data().name,
							},
							author: {
								id: author.id,
								name: author.data().name,
							},
							createdBy: {
								id: createdBy.id,
								name: createdBy.data().name,
							},
							updatedBy: {
								id: updatedBy.id,
								name: updatedBy.data().name,
							},
						};
					})
				);

				return Promise.resolve(musics);
			})
			.catch((error) => Promise.reject(error));
	}

	static select = (id: string) => {
		return musicsRef
			.doc(id)
			.get()
			.then(async (result) => {
				const [album, artist, author, createdBy, updatedBy] = await Promise.all([
					result.data().album.get(),
					result.data().artist.get(),
					result.data().author.get(),
					result.data().createdBy.get(),
					result.data().updatedBy.get(),
				]);

				return Promise.resolve({
					id: result.id,
					name: result.data().name,
					tablature: result.data().tablature,
					album: {
						id: album.id,
						name: album.data().name,
					},
					artist: {
						id: artist.id,
						name: artist.data().name,
					},
					author: {
						id: author.id,
						name: author.data().name,
					},
					createdAt: result.data().createdAt.toDate().toString(),
					createdBy: {
						id: createdBy.id,
						name: createdBy.data().name,
					},
					updatedAt: result.data().updatedAt.toDate().toString(),
					updatedBy: {
						id: updatedBy.id,
						name: updatedBy.data().name,
					},
				});
			})
			.catch((error) => Promise.reject(error));
	}

	static insert = (music: Music) => {
		return musicsRef
			.add(Object.assign({}, music))
			.then((result) => Promise.resolve(result))
			.catch((error) => Promise.reject(error));
	}
}
