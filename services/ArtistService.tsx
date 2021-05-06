import axiosClient from "../configs/axiosClient";

export default class ArtistService {
	search = async (search) => {
		const response = await axiosClient.post("/api/artist/search", search);

		if (response.status == 200) {
			return Promise.resolve(response.data.artists);
		}

		return Promise.reject({ status: response.status, message: response.data.message });
	}

	select = async (slug) => {
		const response = await axiosClient.get(`/api/artist/${slug}/select`);

		if (response.status == 200) {
			return Promise.resolve(response.data.album);
		}

		return Promise.reject({ status: response.status, message: response.data.message });
	}

	insert = async (artist) => {
		const response = await axiosClient.post("/api/artist/insert", artist);

		if (response.status == 200) {
			return Promise.resolve(response.data);
		}

		return Promise.reject({ status: response.status, message: response.data.message });
	}

	exists = async (slug) => {
		const response = await axiosClient.get(`/api/artist/${slug}/exists`);

		if (response.status == 200) {
			return Promise.resolve(response.data.exists);
		}

		return Promise.reject({ status: response.status, message: response.data.message });
	}
}