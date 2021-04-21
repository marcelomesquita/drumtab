import api from "./api";

export default class MusicService {
	search = async (search) => {
		const response = await api.get("/api/music/search", search);

		if (response.status == 200) {
			return Promise.resolve(response.data.musics);
		}

		return Promise.reject({ status: response.status, message: response.data.message });
	}

	select = async (slug) => {
		const response = await api.get(`/api/music/${slug}/select`);

		if (response.status == 200) {
			return Promise.resolve(response.data.music);
		}

		return Promise.reject({ status: response.status, message: response.data.message });
	}

	insert = async (music) => {
		const response = await api.post("/api/music/insert", music)

		if (response.status == 200) {
			return Promise.resolve(response.data);
		}

		return Promise.reject({ status: response.status, message: response.data.message });
	}

	exists = async (slug) => {
		const response = await api.get(`/api/music/${slug}/exists`);

		if (response.status == 200) {
			return Promise.resolve(response.data.exists);
		}

		return Promise.reject({ status: response.status, message: response.data.message });
	}
}
