export default async function (req, res) {
	try {
		if (req.method !== "GET") {
			return res.status(400).json({ error: { code: 400, message: "Method not allowed!" }});
		}

		return res.status(200).json({ artist: {} });

//		const slug: string = req.query.slug as string;
//		const result = await mongoose.models.Artist.findOne({ slug });
//
//		if (!result) {
//			return res.status(404).json({ message: "Not Found!" });
//		}
//
//		return res.status(200).json({ message: "Música encontrada!", artist: result });
	} catch (e) {
		return res.status(500).json({ error: { code: 500, message: e.toString() }});
	}
}
