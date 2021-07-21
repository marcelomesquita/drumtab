import axiosClient from '../adapters/axiosClient';

export default class ArtistService {
	static listByName = async (search) => {
		const response = await axiosClient.post('/api/artists/search', { name: search });

		if (response.status == 200) {
			return Promise.resolve(response.data.artists);
		}

		return Promise.reject({
			status: response.status,
			message: response.data.message,
		});
	};

	static load = async (id) => {
		const response = await axiosClient.get(`/api/artists/${id}`);

		if (response.status == 200) {
			return Promise.resolve(response.data.artist);
		}

		return Promise.reject({
			status: response.status,
			message: response.data.message,
		});
	};

	static save = async (artist) => {
		const response = await axiosClient.put(`/api/artists/${artist.id}`, artist);

		if (response.status == 200) {
			return Promise.resolve(response.data);
		}

		return Promise.reject({
			status: response.status,
			message: response.data.message,
		});
	};

	static exists = async (id) => {
		const response = await axiosClient.head(`/api/artists/${id}`);

		if (response.status == 200) {
			return Promise.resolve();
		}

		return Promise.reject({
			code: response.data.error.code,
			message: response.data.error.message,
		});
	};
}
