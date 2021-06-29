import { NextApiRequest, NextApiResponse } from "next";
import MusicRepository from "../../../repository/MusicRepository";

export default async function (req: NextApiRequest, res: NextApiResponse) {
	try {
		if (req.method !== "POST") {
			return res.status(400).json({ error: { code: 400, message: "Method not allowed!" }});
		}

		const musics = MusicRepository.listByPopularity();

		return res.status(200).json({ musics });
	} catch (e) {
		return res.status(500).json({ error: { code: 500, message: e.toString() }});
	}
}
