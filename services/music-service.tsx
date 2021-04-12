export default class MusicService {
	search = async (search) => {
		const response = await fetch(`${process.env.BASE_URL}/api/music/search`, {
			body: JSON.stringify(search),
			headers: { "Content-Type": "application/json" },
			method: "POST"
		});
		const json = await response.json();

		if (response.status == 200) {
			return Promise.resolve(json.musics);
		}

		return Promise.reject(response.status);
	}

	select = async (slug) => {
		const response = await fetch(`${process.env.BASE_URL}/api/music/${slug}`);
		const json = await response.json();

		if (response.status == 200) {
			return Promise.resolve(json.music);
		}

		return Promise.reject(response.status);
	}

	exists = async (slug) => {
		const response = await fetch(`/api/music/${slug}/exists`);
		const json = await response.json();

		if (response.status == 200) {
			return Promise.resolve(json.exists);
		}

		return Promise.reject(response.status);
	}
}
