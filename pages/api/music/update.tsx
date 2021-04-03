import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";
import { Session } from "next-auth";
import { Db } from "mongodb";
import { ObjectId } from "bson";
import { Music } from "../../../models/music";
import connect from "../../../components/util/database";

export default async function (req: NextApiRequest, res: NextApiResponse) {
	try {
		if (req.method != "POST") {
			return res.status(400).json({message: "Method not allowed!"});
		}

		const session: Session = await getSession({ req });

		if (!session) {
			return res.status(401).json({message: "Unauthorized!"});
		}

		const music: Music = new Music(req.body);

		if (!music.isValid()) {
			return res.status(400).json({message: "Invalid parameter!"});
		}

		music._id = new ObjectId(music._id);

		const db: Db = await connect();
		const result = await db.collection('musics').updateOne({_id: music._id}, {$set: music});

		if (result.modifiedCount === 0) {
			return res.status(404).json({message: "Ops!"});
		}

		return res.status(200).json({message: "Música atualizada!"});
	} catch (e) {
		return res.status(500).json({message: e.toString()});
	}
}
