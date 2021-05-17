import { NextApiRequest, NextApiResponse } from "next";
import UserRepository from "../../../../repository/UserRepository";

export default async function (req: NextApiRequest, res: NextApiResponse) {
	try {
		if (req.method !== "GET") {
			return res.status(400).json({ message: "Method not allowed!" });
		}

		const id: string = req.query.id as string;

		return UserRepository
			.select(id)
			.then((result) => res.status(200).json({ message: "Usuário encontrado!", user: result }))
			.catch((error) => res.status(500).json({ message: error }));
	} catch (e) {
		return res.status(500).json({ message: e.toString() });
	}
}
