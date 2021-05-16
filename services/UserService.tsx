import axiosClient from "../adapters/axiosClient";

export default class UserService {
	search = async (search) => {
		const response = await axiosClient.post("/api/user/search", search);

		if (response.status == 200) {
			return Promise.resolve(response.data.users);
		}

		return Promise.reject({ status: response.status, message: response.data.message });
	}

	select = async (slug) => {
		const response = await axiosClient.get(`/api/user/${slug}/select`);

		if (response.status == 200) {
			return Promise.resolve(response.data.user);
		}

		return Promise.reject({ status: response.status, message: response.data.message });
	}

	insert = async (user) => {
		const response = await axiosClient.post("/api/user/insert", user)

		if (response.status == 200) {
			return Promise.resolve(response.data);
		}

		return Promise.reject({ status: response.status, message: response.data.message });
	}
}
