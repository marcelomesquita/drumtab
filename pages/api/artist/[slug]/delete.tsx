import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";
import { Session } from "next-auth";
import mongoose from "mongoose"
import connect from "../../../../databases/connect";

export default async function (req: NextApiRequest, res: NextApiResponse) {
	try {
		if (req.method !== "DELETE") {
			return res.status(400).json({message: "Method not allowed!"});
		}

		const session: Session = await getSession({ req });

		if (!session) {
			return res.status(401).json({message: "Unauthorized!"});
		}

		await connect();

		const slug: string = req.query.slug as string;
		const result = await mongoose.models.Music.deleteOne({slug}); // TODO: verificar se é o dono

		if (result.deletedCount === 0) {
			return res.status(404).json({message: "Not Found!"});
		}

		return res.status(200).json({message: "Música deletada!"});
	} catch (e) {
		return res.status(500).json({message: e.toString()});
	}
}
