import { NextApiRequest, NextApiResponse } from "next";
import MusicRepository from "../../../../repository/MusicRepository";

export default async function (req: NextApiRequest, res: NextApiResponse) {
	try {
		if (req.method !== "GET") {
			return res.status(400).json({ message: "Method not allowed!" });
		}

		return MusicRepository
			.load(req.query.id as string)
			.then((result) => {
				console.log("result");
				console.log(result);
				if (!result) {
					return res.status(404).json({ message: "Não encontrado" });
				}

				return res.status(200).json({ music: result });
			})
			.catch((error) => {
				console.log("error")
				console.log(error)
				return res.status(500).json({ message: error })
			});
	} catch (e) {
		return res.status(500).json({ message: e.toString() });
	}
}
