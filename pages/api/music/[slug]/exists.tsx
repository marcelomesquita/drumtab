import { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose"
import connect from "../../../../databases/connect";

export default async function (req: NextApiRequest, res: NextApiResponse) {
	try {
		if (req.method !== "GET") {
			return res.status(400).json({ status: 400, message: "Method not allowed!" });
		}

		await connect();

		const slug: string = req.query.slug as string;
		const result = await mongoose.models.Music.exists({slug});

		return res.status(200).json({ status: 200, message: "Música encontrada!", exists: result });
	} catch (e) {
		return res.status(500).json({ status: 500, message: e.toString() });
	}
}
