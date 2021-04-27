import { NextApiRequest, NextApiResponse } from "next";
import firebaseConnection from "../../../../configs/firebaseConnection";

export default async function (req: NextApiRequest, res: NextApiResponse) {
	try {
		if (req.method !== "GET") {
			return res.status(400).json({ message: "Method not allowed!" });
		}

		const id: string = req.query.id as string;

		const result = await firebaseConnection.firestore().collection("users").doc(id).get();

		return res.status(200).json({ message: "Usuário encontrado!", user: result });
	} catch (e) {
		return res.status(500).json({ message: e.toString() });
	}
}
