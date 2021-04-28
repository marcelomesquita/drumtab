import { NextApiRequest, NextApiResponse } from "next";

export default async function (req: NextApiRequest, res: NextApiResponse) {
	try {
		if (req.method !== "DELETE") {
			return res.status(400).json({ message: "Method not allowed!" });
		}

		return res.status(200).json({ message: "Artist deleted!" });

//		const session: Session = await getSession({ req });
//
//		if (!session) {
//			return res.status(401).json({ message: "Unauthorized!" });
//		}
//
//		const slug: string = req.query.slug as string;
//		const result = await mongoose.models.Artist.deleteOne({slug}); // TODO: verificar se é o dono
//
//		if (result.deletedCount === 0) {
//			return res.status(404).json({ message: "Not Found!" });
//		}
//
//		return res.status(200).json({ message: "Artist deleted!" });
	} catch (e) {
		return res.status(500).json({ message: e.toString() });
	}
}
