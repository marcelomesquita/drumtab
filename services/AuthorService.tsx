import axiosClient from 'adapters/axiosClient';

export default class AuthorService {
	static listByName = async (search) => {
		const response = await axiosClient.post('/api/author/search', { name: search });

		if (response.status == 200) {
			return Promise.resolve(response.data.authors);
		}

		return Promise.reject({ status: response.status, message: response.data.message });
	};

	static load = async (id) => {
		const response = await axiosClient.get(`/api/author/${id}/load`);

		if (response.status == 200) {
			return Promise.resolve(response.data.author);
		}

		return Promise.reject({ status: response.status, message: response.data.message });
	};

	static save = async (author) => {
		const response = await axiosClient.post(`/api/author/${author.id}/save`, author);

		if (response.status == 200) {
			return Promise.resolve(response.data);
		}

		return Promise.reject({ status: response.status, message: response.data.message });
	};

	static exists = async (id) => {
		const response = await axiosClient.get(`/api/author/${id}/exists`);

		if (response.status == 200) {
			return Promise.resolve(response.data.exists);
		}

		return Promise.reject({ status: response.status, message: response.data.message });
	};
}
