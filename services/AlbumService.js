import axiosClient from '../adapters/axiosClient';

export default class AlbumService {
	static listByName = async (search) => {
		const response = await axiosClient.post('/api/albums/search', { name: search });

		if (response.status == 200) {
			return Promise.resolve(response.data.albums);
		}

		return Promise.reject({ status: response.status, message: response.data.message });
	};

	static load = async (id) => {
		const response = await axiosClient.get(`/api/albums/${id}`);

		if (response.status == 200) {
			return Promise.resolve(response.data.album);
		}

		return Promise.reject({ status: response.status, message: response.data.message });
	};

	static save = async (album) => {
		const response = await axiosClient.put(`/api/albums/${album.id}`, album);

		if (response.status == 200) {
			return Promise.resolve(response.data);
		}

		return Promise.reject({ status: response.status, message: response.data.message });
	};

	static exists = async (id) => {
		const response = await axiosClient.head(`/api/albums/${id}`);

		if (response.status == 200) {
			return Promise.resolve(response.data.exists);
		}

		return Promise.reject({ 
			code: response.data.error.code, 
			message: response.data.error.message
		});
	};
}
