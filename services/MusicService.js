import axiosClient from '../adapters/axiosClient';

export default class MusicService {
	static search = async (search) => {
		const response = await axiosClient.get('/api/musics/search');

		if (response.status == 200) {
			return Promise.resolve(response.data.musics);
		}

		return Promise.reject({
			code: response.data.error.code,
			message: response.data.error.message,
		});
	};

	static load = async (id) => {
		const response = await axiosClient.get(`/api/musics/${id}`);

		if (response.status == 200) {
			return Promise.resolve(response.data.music);
		}

		return Promise.reject({
			code: response.data.error.code,
			message: response.data.error.message,
		});
	};

	static save = async (music) => {
		const response = await axiosClient.put(`/api/musics/${music.id}`, music);

		if (response.status == 200) {
			return Promise.resolve(response.data);
		}

		return Promise.reject({
			code: response.data.error.code,
			message: response.data.error.message,
		});
	};

	static exists = async (id) => {
		const response = await axiosClient.head(`/api/musics/${id}`);

		if (response.status == 200) {
			return Promise.resolve();
		}

		return Promise.reject({
			code: response.data.error.code,
			message: response.data.error.message,
		});
	};
}
