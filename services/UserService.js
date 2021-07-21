import axiosClient from '../adapters/axiosClient';

export default class UserService {
	static search = async (search) => {
		const response = await axiosClient.post('/api/users/search', search);

		if (response.status == 200) {
			return Promise.resolve(response.data.users);
		}

		return Promise.reject({
			code: response.data.error.code,
			message: response.data.error.message,
		});
	};

	static load = async (slug) => {
		const response = await axiosClient.get(`/api/users/${slug}`);

		if (response.status == 200) {
			return Promise.resolve(response.data.user);
		}

		return Promise.reject({
			code: response.data.error.code,
			message: response.data.error.message,
		});
	};

	static save = async (user) => {
		const response = await axiosClient.put(`/api/users/${user.id}`, user);

		if (response.status == 200) {
			return Promise.resolve(response.data);
		}

		return Promise.reject({
			code: response.data.error.code,
			message: response.data.error.message,
		});
	};

	static exists = async (id) => {
		const response = await axiosClient.head(`/api/users/${id}`);

		if (response.status == 200) {
			return Promise.resolve();
		}

		return Promise.reject({
			code: response.data.error.code,
			message: response.data.error.message,
		});
	};
}
