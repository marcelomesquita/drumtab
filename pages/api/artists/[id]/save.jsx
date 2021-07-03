export default async function (req, res) {
	try {
		if (req.method != "POST") {
			return res.status(400).json({ error: { code: 400, message: "Method not allowed!" }});
		}

		return res.status(200).json({ artist: {} });

//		const session: Session = await getSession({ req });
//
//		if (!session) {
//			return res.status(401).json({ message: "Unauthorized!" });
//		}
//
//		const artist: Artist = new Artist(req.body);
//
//		artist.createdBy = artist.updatedBy = await mongoose.models.User.findOne({ email: session.user.email });
//		artist.createdAt = artist.updatedAt = new Date();
//
//		if (!artist.isValid()) {
//			return res.status(400).json({ message: "Invalid parameter!" });
//		}
//
//		const result = await mongoose.models.Artist.create(artist);
//
//		if (result.insertedCount === 0) {
//			return res.status(500).json({ message: result });
//		}
//
//		return res.status(200).json({ message: "Música cadastrada!", artist: result });
	} catch (e) {
		return res.status(500).json({ error: { code: 500, message: e.toString() }});
	}
}
