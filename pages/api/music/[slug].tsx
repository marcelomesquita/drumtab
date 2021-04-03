import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";
import { Session } from "next-auth";
import { Db, ObjectId } from "mongodb";
import connect from "../../../components/util/database";

async function select(req: NextApiRequest, res: NextApiResponse) {
	try {
		const slug: string = req.query.slug as string;
		const db: Db = await connect();
		const result = await db.collection("musics").findOne({slug});

		if (!result) {
			return res.status(404).json({message: "Not Found!"});
		}

		return res.status(200).json({message: "Música encontrada!", music: result});
	} catch (e) {
		return res.status(500).json({message: e.toString()});
	}
}

async function remove(req: NextApiRequest, res: NextApiResponse) {
	try {
		const session: Session = await getSession({ req });

		if (!session) {
			return res.status(401).json({message: "Unauthorized!"});
		}

		const slug: string = req.query.slug as string;
		const db: Db = await connect();
		const result = await db.collection('musics').deleteOne({slug});

		if (result.deletedCount === 0) {
			return res.status(404).json({message: "Not Found!"});
		}

		return res.status(200).json({message: "Música deletada!"});
	} catch (e) {
		return res.status(500).json({message: e.toString()});
	}
}

export default async function (req: NextApiRequest, res: NextApiResponse) {
	switch (req.method) {
		case "GET":
			return select(req, res);
		case "DELETE":
			return remove(req, res);
		default:
			return res.status(400).json({message: "Method not allowed!"});
	}
}
