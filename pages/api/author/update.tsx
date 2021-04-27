import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";
import { Session } from "next-auth";
import { ObjectId } from "bson";
import mongoose from 'mongoose'
import mongoConnection from "../../../configs/mongoConnection";
import Author from "../../../structures/models/Author";

export default async function (req: NextApiRequest, res: NextApiResponse) {
	try {
		if (req.method != "POST") {
			return res.status(400).json({ message: "Method not allowed!" });
		}

		const session: Session = await getSession({ req });

		if (!session) {
			return res.status(401).json({ message: "Unauthorized!" });
		}

		const author: Author = new Author(req.body);

		await mongoConnection();

		author._id = new ObjectId(author._id);

		if (!author.isValid()) {
			return res.status(400).json({ message: "Invalid parameter!" });
		}

		const result = await mongoose.models.Author.updateOne({ _id: author._id }, { $set: author });

		if (!result.ok) {
			return res.status(404).json({ message: result });
		}

		return res.status(200).json({ message: "Música atualizada!" });
	} catch (e) {
		return res.status(500).json({ message: e.toString() });
	}
}
