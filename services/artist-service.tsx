import { PROJECT } from "../project";

export default class ArtistService {
	search = async (search) => {
		const response = await fetch(`${PROJECT.URL}/api/artist/search`, {
			body: JSON.stringify(search),
			headers: { "Content-Type": "application/json" },
			method: "POST"
		});
		const json = await response.json();

		if (response.status == 200) {
			return Promise.resolve(json.artists);
		}

		return Promise.reject({ status: response.status, message: json.message });
	}

	select = async (slug) => {
		const response = await fetch(`${PROJECT.URL}/api/artist/${slug}/select`);
		const json = await response.json();

		if (response.status == 200) {
			return Promise.resolve(json.music);
		}

		return Promise.reject({ status: response.status, message: json.message });
	}

	insert = async (artist) => {
		const response = await fetch(`/api/artist/insert`, {
			body: JSON.stringify(artist),
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
		const response = await fetch(`/api/artist/${slug}/exists`);
		const json = await response.json();

		if (response.status == 200) {
			return Promise.resolve(json.exists);
		}

		return Promise.reject({ status: response.status, message: json.message });
	}
}
