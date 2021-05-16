import axiosClient from "../adapters/axiosClient";

export default class AuthorService {
	search = async (search) => {
		const response = await axiosClient.post("/api/author/search", search);

		if (response.status == 200) {
			return Promise.resolve(response.data.authors);
		}

		return Promise.reject({ status: response.status, message: response.data.message });
	}

	select = async (slug) => {
		const response = await axiosClient.get(`/api/author/${slug}/select`);

		if (response.status == 200) {
			return Promise.resolve(response.data.author);
		}

		return Promise.reject({ status: response.status, message: response.data.message });
	}

	insert = async (author) => {
		const response = await axiosClient.post("/api/author/insert", author);

		if (response.status == 200) {
			return Promise.resolve(response.data);
		}

		return Promise.reject({ status: response.status, message: response.data.message });
	}

	exists = async (slug) => {
		const response = await axiosClient.get(`/api/author/${slug}/exists`);

		if (response.status == 200) {
			return Promise.resolve(response.data.exists);
		}

		return Promise.reject({ status: response.status, message: response.data.message });
	}
}
