import axiosClient from "../adapters/axiosClient";

export default class ArtistService {
	static listByName = async (search) => {
		const response = await axiosClient.post("/api/artist/search", { name: search });

		if (response.status == 200) {
			return Promise.resolve(response.data.artists);
		}

		return Promise.reject({ status: response.status, message: response.data.message });
	}

	static load = async (id) => {
		const response = await axiosClient.get(`/api/artist/${id}/load`);

		if (response.status == 200) {
			return Promise.resolve(response.data.album);
		}

		return Promise.reject({ status: response.status, message: response.data.message });
	}

	static save = async (artist) => {
		const response = await axiosClient.post(`/api/artist/${artist.id}/save`, artist);

		if (response.status == 200) {
			return Promise.resolve(response.data);
		}

		return Promise.reject({ status: response.status, message: response.data.message });
	}

	static exists = async (id) => {
		const response = await axiosClient.get(`/api/artist/${id}/exists`);

		if (response.status == 200) {
			return Promise.resolve(response.data.exists);
		}

		return Promise.reject({ status: response.status, message: response.data.message });
	}
}
