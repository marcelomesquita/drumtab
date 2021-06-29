import axiosClient from 'adapters/axiosClient';

export default class MusicService {
	static search = async (search) => {
		const response = await axiosClient.post('/api/musics/search', search);

		if (response.status == 200) {
			return Promise.resolve(response.data.musics);
		}

		return Promise.reject({
			code: response.data.error.code,
			message: response.data.error.message,
		});
	};

	static load = async (id) => {
		const response = await axiosClient.get(`/api/musics/${id}/load`);

		if (response.status == 200) {
			return Promise.resolve(response.data.music);
		}

		return Promise.reject({
			code: response.data.error.code,
			message: response.data.error.message,
		});
	};

	static save = async (music) => {
		const response = await axiosClient.post(`/api/musics/${music.id}/save`, music);

		if (response.status == 200) {
			return Promise.resolve(response.data);
		}

		return Promise.reject({
			code: response.data.error.code,
			message: response.data.error.message,
		});
	};

	static exists = async (id) => {
		const response = await axiosClient.get(`/api/musics/${id}/exists`);

		if (response.status == 200) {
			return Promise.resolve(response.data.exists);
		}

		return Promise.reject({
			code: response.data.error.code,
			message: response.data.error.message,
		});
	};
}
