import { NextApiRequest, NextApiResponse } from "next";
import Author from "../../../../structures/models/Author";

export default async function (req: NextApiRequest, res: NextApiResponse) {
	try {
		if (req.method != "POST") {
			return res.status(400).json({ message: "Method not allowed!" });
		}

		return res.status(200).json({ message: "Música cadastrada!", author: {} });

//		const session: Session = await getSession({ req });
//
//		if (!session) {
//			return res.status(401).json({ message: "Unauthorized!" });
//		}
//
//		const author: Author = new Author(req.body);
//
//		author.createdBy = author.updatedBy = await mongoose.models.User.findOne({ email: session.user.email });
//		author.createdAt = author.updatedAt = new Date();
//
//		if (!author.isValid()) {
//			return res.status(400).json({ message: "Invalid parameter!" });
//		}
//
//		const result = await mongoose.models.Author.create(author);
//
//		if (result.insertedCount === 0) {
//			return res.status(500).json({ message: result });
//		}
//
//		return res.status(200).json({ message: "Música cadastrada!", author: result });
	} catch (e) {
		return res.status(500).json({ message: e.toString() });
	}
}
