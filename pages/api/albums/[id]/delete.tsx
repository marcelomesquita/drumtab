import { NextApiRequest, NextApiResponse } from "next";

export default async function (req: NextApiRequest, res: NextApiResponse) {
	try {
		if (req.method !== "DELETE") {
			return res.status(400).json({ error: { code: 400, message: "Method not allowed!" }});
		}

		return res.status(200).json({ message: "Album deleted!" });

//		const session: Session = await getSession({ req });
//
//		if (!session) {
//			return res.status(401).json({ message: "Unauthorized!" });
//		}
//
//		const slug: string = req.query.slug as string;
//		const result = await mongoose.models.Album.deleteOne({slug}); // TODO: verificar se é o dono
//
//		if (result.deletedCount === 0) {
//			return res.status(404).json({ message: "Not Found!" });
//		}
//
//		return res.status(200).json({ message: "Album deleted!" });
	} catch (e) {
		return res.status(500).json({ error: { code: 500, message: e.toString() }});
	}
}
