import axiosClient from '../adapters/axiosClient';

export default class SamplesService {
	static search = async (search, order, last, limit) => {
		const response = await axiosClient.get('/api/samples/search', {
			params: {
				search,
				order,
				last,
				limit
			}
		});

		if (response.status == 200) {
			return Promise.resolve(response.data.samples);
		}

		return Promise.reject({
			code: response.data.error.code,
			message: response.data.error.message,
		});
	};

	static load = async (id) => {
		const response = await axiosClient.get(`/api/samples/${id}`);

		if (response.status == 200) {
			return Promise.resolve(response.data.sample);
		}

		return Promise.reject({
			code: response.data.error.code,
			message: response.data.error.message,
		});
	};

	static save = async (sample) => {
		const response = await axiosClient.put(`/api/samples/${sample.id}`, sample);

		if (response.status == 200) {
			return Promise.resolve(response.data);
		}

		return Promise.reject({
			code: response.data.error.code,
			message: response.data.error.message,
		});
	};

	static exists = async (id) => {
		const response = await axiosClient.head(`/api/samples/${id}`);

		if (response.status == 200) {
			return Promise.resolve();
		}

		return Promise.reject({
			code: response.data.error.code,
			message: response.data.error.message,
		});
	};
}
