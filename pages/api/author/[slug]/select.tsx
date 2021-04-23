import { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose"
import connect from "../../../../databases/connect";

export default async function (req: NextApiRequest, res: NextApiResponse) {
	try {
		if (req.method !== "GET") {
			return res.status(400).json({ message: "Method not allowed!" });
		}

		await connect();

		const slug: string = req.query.slug as string;
		const result = await mongoose.models.Author.findOne({ slug });

		if (!result) {
			return res.status(404).json({ message: "Not Found!" });
		}

		return res.status(200).json({ message: "Música encontrada!", author: result });
	} catch (e) {
		return res.status(500).json({ message: e.toString() });
	}
}
