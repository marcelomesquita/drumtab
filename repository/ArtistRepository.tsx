import { firebase } from "../adapters/firebaseClient";
import Artist from "../structures/models/Artist";
import ArtistSearch from "../structures/models/search/ArtistSearch";

const artistsRef = firebase.firestore().collection("artists");

export default class ArtistRepository {
	static search = async (search: ArtistSearch) => {
		return artistsRef
			.orderBy('name')
			.startAt(search.name)
			.endAt(search.name + '\uf8ff')
			.get()
			.then((result) => {
				const artists = result.docs.map((artist) => {
					return {
						id: artist.id,
						name: artist.data().name,
					}
				});

				return Promise.resolve(artists);
			})
			.catch((error) => Promise.reject(error));
	}

	static select = async (id: string) => {
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
	}

	static insert = (artist: Artist) => {
		return artistsRef
			.add(artist)
			.then((result) => Promise.resolve(result))
			.catch((error) => Promise.reject(error));
	}
}
