import { firebase } from "../adapters/firebaseClient";
import Music from "../structures/models/Music";
import MusicSearch from "../structures/models/search/MusicSearch";

interface search {
	name?,
	slug?
}

const musicsRef = firebase.firestore().collection("musics");

export default class MusicRepository {
	static search = async (musicSearch: MusicSearch) => {
		let search: search = {};

		if (musicSearch?.name) {
			search.name = { "$regex": musicSearch.name, "$options": "i" }
		}

		if (musicSearch?.slug) {
			search.slug = musicSearch.slug
		}

		return musicsRef
			.get()
			.then(async (result) => {
				const musics = await Promise.all(
					result.docs.map(async (music) => {
						const [album, artist, author] = await Promise.all([
							music.data().album.get(),
							music.data().artist.get(),
							music.data().author.get()
						]);

						return {
							id: music.id,
							name: music.data().name,
							slug: music.data().slug,
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
			.then((result) => Promise.resolve(result))
			.catch((error) => Promise.reject(error));
	}

	static insert = (music: Music) => {
		return musicsRef
			.add(Object.assign({}, music))
			.then((result) => Promise.resolve(result))
			.catch((error) => Promise.reject(error));
	}
}
