import { firebase } from '../adapters/firebaseClient';

const musicsRef = firebase.firestore().collection('musics');
const artistsRef = firebase.firestore().collection('artists');
const albumsRef = firebase.firestore().collection('albums');
const authorsRef = firebase.firestore().collection('authors');
const usersRef = firebase.firestore().collection('users');

export default class MusicRepository {
	static search = async (search, last = '', order = 'name', limit = 10) => {
		return musicsRef
			.orderBy(order)
			.startAfter(last)
			.limit(limit)
			.get()
			.then(async (result) => {
				const musics = await Promise.all(
					result.docs.map(async (music) => {
						const [album, artist, author, createdBy, updatedBy] = await Promise.all([
							music.data().album?.get(),
							music.data().artist.get(),
							music.data().author?.get(),
							music.data().createdBy.get(),
							music.data().updatedBy.get(),
						]);

						return {
							id: music.id,
							name: music.data().name,
							tablature: music.data().tablature,
							artist: {
								id: artist.id,
								name: artist.data().name,
							},
							album: !album ? {} : {
								id: album.id,
								name: album.data().name,
							},
							author: !author ? {} : {
								id: author.id,
								name: author.data().name,
							},
							createdAt: music.data().createdAt?.toDate().toISOString(),
							createdBy: {
								id: createdBy.id,
								name: createdBy.data().name,
							},
							updatedAt: music.data().updatedAt.toDate().toISOString(),
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
	};

	static exists = async (id) => {
		return musicsRef
			.doc(id)
			.get()
			.then((result) => Promise.resolve(result.exists))
			.catch((error) => Promise.reject(error));
	};

	static load = (id) => {
		return musicsRef
			.doc(id)
			.get()
			.then(async (result) => {
				const [album, artist, author, createdBy, updatedBy] = await Promise.all([
					result.data().album?.get(),
					result.data().artist.get(),
					result.data().author?.get(),
					result.data().createdBy.get(),
					result.data().updatedBy.get(),
				]);

				const music = {
					id: result.id,
					name: result.data().name,
					tablature: result.data().tablature,
					artist: {
						id: artist.id,
						name: artist.data().name,
					},
					album: !album ? {} : {
						id: album.id,
						name: album.data().name,
					},
					author: !author ? {} : {
						id: author.id,
						name: author.data().name,
					},
					createdAt: result.data().createdAt?.toDate().toISOString(),
					createdBy: {
						id: createdBy.id,
						name: createdBy.data().name,
					},
					updatedAt: result.data().updatedAt.toDate().toISOString(),
					updatedBy: {
						id: updatedBy.id,
						name: updatedBy.data().name,
					},
				};

				return Promise.resolve(music);
			})
			.catch((error) => Promise.reject(error));
	};

	static save = async (music, session) => {
		if (!music.isValid()) {
			return Promise.reject('Invalid parameters');
		}

		const musicPlain = {
			name: music.name,
			tablature: Object.assign({}, music.tablature),
			artist: artistsRef.doc(music.artist.id),
			album: !music.album.id ? null : albumsRef.doc(music.album.id),
			author: !music.author.id ? null : authorsRef.doc(music.author.id),
			createdBy: usersRef.doc(session.uid),
			createdAt: new Date(),
			updatedBy: usersRef.doc(session.uid),
			updatedAt: new Date(),
		}

		return musicsRef
			.doc(music.id)
			.set(musicPlain)
			.then((result) => Promise.resolve(result))
			.catch((error) => Promise.reject(error));
	};
}
