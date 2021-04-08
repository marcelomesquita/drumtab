import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";
import { Session } from "next-auth";
import { ObjectId } from "bson";
import mongoose from 'mongoose'
import connect from "../../../databases/connect";
import { Music } from "../../../models/music";
import { User } from "../../../models/user";

export default async function (req: NextApiRequest, res: NextApiResponse) {
	try {
		if (req.method != "POST") {
			return res.status(400).json({ message: "Method not allowed!" });
		}

		const session: Session = await getSession({ req });

		if (!session) {
			return res.status(401).json({ message: "Unauthorized!" });
		}

		const music: Music = new Music(req.body);

		music.createdAt = new Date();
		music.createdBy = new User({_id: new ObjectId("6064d8c88d57629b049f45e0")});

		if (!music.isValid()) {
			return res.status(400).json({ message: "Invalid parameter!" });
		}

		await connect();
		const result = await mongoose.models.Music.create(music);

		if (result.insertedCount === 0) {
			return res.status(500).json({ message: result });
		}

		return res.status(200).json({ message: "Música cadastrada!", music: result });
	} catch (e) {
		return res.status(500).json({ message: e.toString() });
	}
}
