import { firebase } from '../adapters/firebaseClient';

const samplesRef = firebase.firestore().collection('samples');
const usersRef = firebase.firestore().collection('users');

export default class SamplesRepository {
	static search = async (search, last = '', order = 'name', limit = 10) => {
		return samplesRef
			.orderBy(order)
			.startAfter(last)
			.limit(limit)
			.get()
			.then(async (result) => {
				const samples = await Promise.all(
					result.docs.map(async (sample) => {
						const [createdBy, updatedBy] = await Promise.all([
							sample.data().createdBy.get(),
							sample.data().updatedBy.get(),
						]);

						return {
							id: sample.id,
							name: sample.data().name,
							tablature: sample.data().tablature,
							createdAt: sample.data().createdAt?.toDate().toISOString(),
							createdBy: {
								id: createdBy.id,
								name: createdBy.data().name,
								avatar: createdBy.data().avatar,
							},
							updatedAt: sample.data().updatedAt.toDate().toISOString(),
							updatedBy: {
								id: updatedBy.id,
								name: updatedBy.data().name,
								avatar: createdBy.data().avatar,
							},
						};
					})
				);

				return Promise.resolve(samples);
			})
			.catch((error) => Promise.reject(error));
	};

	static exists = async (id) => {
		return samplesRef
			.doc(id)
			.get()
			.then((result) => Promise.resolve(result.exists))
			.catch((error) => Promise.reject(error));
	};

	static load = (id) => {
		return samplesRef
			.doc(id)
			.get()
			.then(async (result) => {
				const [createdBy, updatedBy] = await Promise.all([
					result.data().createdBy.get(),
					result.data().updatedBy.get(),
				]);

				const sample = {
					id: result.id,
					name: result.data().name,
					tablature: result.data().tablature,
					createdAt: result.data().createdAt?.toDate().toISOString(),
					createdBy: {
						id: createdBy.id,
						name: createdBy.data().name,
						avatar: createdBy.data().avatar,
					},
					updatedAt: result.data().updatedAt.toDate().toISOString(),
					updatedBy: {
						id: updatedBy.id,
						name: updatedBy.data().name,
						avatar: createdBy.data().avatar,
					},
				};

				return Promise.resolve(sample);
			})
			.catch((error) => Promise.reject(error));
	};

	static save = async (sample, session) => {
		if (!sample.isValid()) {
			return Promise.reject('Invalid parameters');
		}

		const samplePlain = {
			name: sample.name,
			tablature: Object.assign({}, sample.tablature),
			createdBy: usersRef.doc(session.uid),
			createdAt: new Date(),
			updatedBy: usersRef.doc(session.uid),
			updatedAt: new Date(),
		}

		return samplesRef
			.doc(sample.id)
			.set(samplePlain)
			.then((result) => Promise.resolve(result))
			.catch((error) => Promise.reject(error));
	};
}
