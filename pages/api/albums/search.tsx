import { NextApiRequest, NextApiResponse } from "next";
import AlbumRepository from "../../../repository/AlbumRepository";

export default async function (req: NextApiRequest, res: NextApiResponse) {
	try {
		if (req.method !== "POST") {
			return res.status(400).json({ error: { code: 400, message: "Method not allowed!" }});
		}

		return AlbumRepository
			.listByName(req.body.name)
			.then((result) => {
				if (result.length == 0) {
					return res.status(404).json({ error: { code: 404, message: "Não encontrado" }});
				}

				return res.status(200).json({ albums: result });
			})
			.catch((error) => res.status(500).json({ message: error }));
	} catch (e) {
		return res.status(500).json({ error: { code: 500, message: e.toString() }});
	}
}
