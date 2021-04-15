import { PROJECT } from "../project";

export default class MusicService {
	search = async (search) => {
		const response = await fetch(`${PROJECT.URL}/api/music/search`, {
			body: JSON.stringify(search),
			headers: { "Content-Type": "application/json" },
			method: "POST"
		});
		const json = await response.json();

		if (response.status == 200) {
			return Promise.resolve(json.musics);
		}

		return Promise.reject({ status: response.status, message: json.message });
	}

	select = async (slug) => {
		const response = await fetch(`${PROJECT.URL}/api/music/${slug}/select`);
		const json = await response.json();

		if (response.status == 200) {
			return Promise.resolve(json.music);
		}

		return Promise.reject({ status: response.status, message: json.message });
	}

	insert = async (music) => {
		const response = await fetch(`/api/music/insert`, {
			body: JSON.stringify(music),
			headers: { "Content-Type": "application/json" },
			method: "POST"
		});
		const json = await response.json();

		if (response.status == 200) {
			return Promise.resolve(json);
		}

		return Promise.reject({ status: response.status, message: json.message });
	}

	delete = async (id) => {
	}

	exists = async (slug) => {
		const response = await fetch(`/api/music/${slug}/exists`);
		const json = await response.json();

		if (response.status == 200) {
			return Promise.resolve(json.exists);
		}

		return Promise.reject({ status: response.status, message: json.message });
	}
}
