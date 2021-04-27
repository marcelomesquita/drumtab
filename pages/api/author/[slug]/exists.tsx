import { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose"
import mongoConnection from "../../../../configs/mongoConnection";

export default async function (req: NextApiRequest, res: NextApiResponse) {
	try {
		if (req.method !== "GET") {
			return res.status(400).json({ message: "Method not allowed!" });
		}

		await mongoConnection();

		const slug: string = req.query.slug as string;
		const result = await mongoose.models.Author.exists({slug});

		return res.status(200).json({ message: "Author encontrado!", exists: result });
	} catch (e) {
		return res.status(500).json({ message: e.toString() });
	}
}
