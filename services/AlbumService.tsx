import api from "../configs/api";

export default class AlbumService {
	search = async (search) => {
		const response = await api.post("/api/album/search", search);

		if (response.status == 200) {
			return Promise.resolve(response.data.albums);
		}

		return Promise.reject({ status: response.status, message: response.data.message });
	}

	select = async (slug) => {
		const response = await api.get(`/api/album/${slug}/select`);

		if (response.status == 200) {
			return Promise.resolve(response.data.album);
		}

		return Promise.reject({ status: response.status, message: response.data.message });
	}

	insert = async (album) => {
		const response = await api.post("/api/album/insert", album);

		if (response.status == 200) {
			return Promise.resolve(response.data);
		}

		return Promise.reject({ status: response.status, message: response.data.message });
	}

	exists = async (slug) => {
		const response = await api.get(`/api/album/${slug}/exists`);

		if (response.status == 200) {
			return Promise.resolve(response.data.exists);
		}

		return Promise.reject({ status: response.status, message: response.data.message });
	}
}
