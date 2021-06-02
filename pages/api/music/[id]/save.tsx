import { NextApiRequest, NextApiResponse } from "next";
import Music from "../../../../structures/models/Music";

export default async function (req: NextApiRequest, res: NextApiResponse) {
	try {
		if (req.method != "POST") {
			return res.status(400).json({ message: "Method not allowed!" });
		}

		return res.status(200).json({ message: "Música cadastrada!", music: {} });

//		const session: Session = await getSession({ req });
//
//		if (!session) {
//			return res.status(401).json({ message: "Unauthorized!" });
//		}
//
//		const music: Music = new Music(req.body);
//
//		const artist = await mongoose.models.Artist.findOne({ name: music.artist.name });
//
//		if (!artist) {
//			return res.status(404).json({ message: "Artist not founded!" });
//		}
//
//		music.artist = artist;
//		music.createdBy = music.updatedBy = await mongoose.models.User.findOne({ email: session.user.email });
//		music.createdAt = music.updatedAt = new Date();
//
//		if (!music.isValid()) {
//			return res.status(400).json({ message: "Invalid parameter!" });
//		}
//
//		const result = await mongoose.models.Music.create(music);
//
//		if (result.insertedCount === 0) {
//			return res.status(500).json({ message: result });
//		}
//
//		return res.status(200).json({ message: "Música cadastrada!", music: result });
	} catch (e) {
		switch (e.code) {
			case 11000:
				return res.status(500).json({ message: `Chave duplicada!` });
			default:
				return res.status(500).json({ message: e.toString() });
		}
	}
}
