import { NextApiRequest, NextApiResponse } from "next";
import nookies from "nookies";
import MusicRepository from "../../../../repository/MusicRepository";
import Music from "../../../../structures/models/Music";

export default async function (req: NextApiRequest, res: NextApiResponse) {
	try {
		if (req.method != "POST") {
			return res.status(400).json({ error: { code: 400, message: "Method not allowed!" }});
		}

		const cookies = nookies.get({ req });

		if (!cookies.token) {
			return { props: { error: { code: 403, message: "Forbidden" }}};
		}

		const music: Music = new Music(req.body);

		if (!music.isValid()) {
			return res.status(400).json({ error: { code: 400, message: "Invalid parameter!" }});
		}

		const blah = await MusicRepository.save(music);
		console.log("blah");
		console.log(blah);
		return res.status(200).json({ message: "Música salva!" });
	} catch (e) {
		console.log(e);
		return res.status(500).json({ error: { code: 500, message: e.toString() }});
	}
}
