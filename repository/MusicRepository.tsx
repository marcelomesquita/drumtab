import { firebase } from 'adapters/firebaseClient';
import Music from 'structures/models/Music';

const musicsRef = firebase.firestore().collection('musics');

export default class MusicRepository {
	static listByPopularity = async () => {
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
	};

	static load = (id: string) => {
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

				const music = {
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
				};

				return Promise.resolve(music);
			})
			.catch((error) => Promise.reject(error));
	};

	static save = async (music: Music) => {
		if (!music.isValid()) {
			return Promise.reject('Invalid parameters');
		}

		const musicPlain: any = Object.assign({}, music);

		//musicPlain.createdBy = music.updatedBy = `/users/${identity.user_id}`;
		musicPlain.createdAt = music.updatedAt = new Date();
		musicPlain.tablature = {
			times: 4,
			beats: 4,
			beatsPerMin: 60,
			staff: [
				{ c: 0, h: 1, r: 0, s: 0, t1: 0, t2: 0, t3: 0, b: 1 },
				{ c: 0, h: 1, r: 0, s: 0, t1: 0, t2: 0, t3: 0, b: 0 },
				{ c: 0, h: 1, r: 0, s: 1, t1: 0, t2: 0, t3: 0, b: 0 },
				{ c: 0, h: 1, r: 0, s: 0, t1: 0, t2: 0, t3: 0, b: 0 },
			],
		};

		return musicsRef
			.doc(musicPlain.id)
			.set(musicPlain)
			.then((result) => Promise.resolve(result))
			.catch((error) => Promise.reject(error));
	};

	static exists = (id: string) => {
		return musicsRef
			.doc(id)
			.get()
			.then(async (result) => Promise.resolve(result.exists))
			.catch((error) => Promise.reject(error));
	};
}
