import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";
import { Session } from "next-auth";
import mongoose from "mongoose"
import connect from "../../../../databases/connect";

export default async function (req: NextApiRequest, res: NextApiResponse) {
	try {
		if (req.method !== "DELETE") {
			return res.status(400).json({ status: 400, message: "Method not allowed!" });
		}

		const session: Session = await getSession({ req });

		if (!session) {
			return res.status(401).json({ status: 401, message: "Unauthorized!" });
		}

		await connect();

		const slug: string = req.query.slug as string;
		const result = await mongoose.models.Artist.deleteOne({slug}); // TODO: verificar se é o dono

		if (result.deletedCount === 0) {
			return res.status(404).json({ status: 404, message: "Not Found!" });
		}

		return res.status(200).json({ status: 200, message: "Artist deleted!" });
	} catch (e) {
		return res.status(500).json({ status: 500, message: e.toString() });
	}
}