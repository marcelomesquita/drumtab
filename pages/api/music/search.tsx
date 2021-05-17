import { NextApiRequest, NextApiResponse } from "next";
import MusicRepository from "../../../repository/MusicRepository";

export default async function (req: NextApiRequest, res: NextApiResponse) {
	try {
		if (req.method !== "POST") {
			return res.status(400).json({ message: "Method not allowed!" });
		}

		const musics = MusicRepository.search(req.body);

		return res.status(200).json({ musics });
	} catch (e) {
		return res.status(500).json({ message: e.toString() });
	}
}
