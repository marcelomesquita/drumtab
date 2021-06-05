import { NextApiRequest, NextApiResponse } from "next";
import AuthorRepository from "../../../repository/AuthorRepository";

export default async function (req: NextApiRequest, res: NextApiResponse) {
	try {
		if (req.method !== "POST") {
			return res.status(400).json({ message: "Method not allowed!" });
		}

		return AuthorRepository
			.listByName(req.body.name)
			.then((result) => {
				if (result.length == 0) {
					return res.status(404).json({ message: "Não encontrado" });
				}

				res.status(200).json({ authors: result });
			})
			.catch((error) => res.status(500).json({ message: error }));
	} catch (e) {
		return res.status(500).json({ message: e.toString() });
	}
}
