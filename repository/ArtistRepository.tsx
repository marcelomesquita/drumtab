import { firebase } from "../adapters/firebaseClient";
import Artist from "../structures/models/Artist";
import ArtistSearch from "../structures/models/search/ArtistSearch";

interface search {
	name?,
	slug?
}

const artistsRef = firebase.firestore().collection("artists");

export default class ArtistRepository {
	static search = async (artistSearch: ArtistSearch) => {
		let search: search = {};

		if (artistSearch?.name) {
			search.name = { "$regex": artistSearch.name, "$options": "i" }
		}

		if (artistSearch?.slug) {
			search.slug = artistSearch.slug
		}

		return artistsRef
			.withConverter(artistConverter)
			.get()
			.then((result) => {
				let artists = [];

				result.forEach((artist) => artists.push({
					id: artist.id,
					name: artist.data().name,
					slug: artist.data().slug,
				}));

				return Promise.resolve(artists);
			})
			.catch((error) => Promise.reject(error));
	}

	static select = async (id: string) => {
		return artistsRef
			.doc(id)
			.get()
			.then((result) => {
				const artist = new Artist({
					id: result.id,
					name: result.data().name,
					slug: result.data().slug,
				});

				return Promise.resolve(artist);
			})
			.catch((error) => Promise.reject(error));
	}

	static insert = (artist: Artist) => {
		return artistsRef
			.withConverter(artistConverter)
			.add(artist)
			.then((result) => Promise.resolve(result))
			.catch((error) => Promise.reject(error));
	}
}

const artistConverter = {
	toFirestore: (album) => Object.assign({}, album),
    fromFirestore: (snapshot, options) => {
		return new Artist(snapshot.data(options), snapshot.id);
	}
}
