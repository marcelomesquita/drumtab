import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";
import { Session } from "next-auth";
import { ObjectId } from "bson";
import mongoose from 'mongoose'
import connect from "../../../databases/connect";
import { Music } from "../../../models/music";

export default async function (req: NextApiRequest, res: NextApiResponse) {
	try {
		if (req.method != "POST") {
			return res.status(400).json({ status: 400, message: "Method not allowed!" });
		}

		const session: Session = await getSession({ req });

		if (!session) {
			return res.status(401).json({ status: 401, message: "Unauthorized!" });
		}

		const music: Music = new Music(req.body);

		await connect();

		music._id = new ObjectId(music._id);

		if (!music.isValid()) {
			return res.status(400).json({ status: 400, message: "Invalid parameter!" });
		}

		const result = await mongoose.models.Music.updateOne({_id: music._id}, {$set: music});

		if (!result.ok) {
			return res.status(404).json({ status: 404, message: result });
		}

		return res.status(200).json({ status: 200, message: "Música atualizada!" });
	} catch (e) {
		return res.status(500).json({ status: 500, message: e.toString() });
	}
}
