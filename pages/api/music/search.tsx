import { NextApiRequest, NextApiResponse } from 'next';
import { firebase } from "../../../configs/firebaseClient";
import MusicSearch from '../../../structures/models/search/MusicSearch';

interface search {
	name?,
	slug?
}

export default async function (req: NextApiRequest, res: NextApiResponse) {
	try {
		if (req.method !== "POST") {
			return res.status(400).json({ message: "Method not allowed!" });
		}

		let musicSearch: MusicSearch = req.body;
		let search: search = {};

		if (musicSearch?.name) {
			search.name = { "$regex": musicSearch.name, "$options": "i" }
		}

		if (musicSearch?.slug) {
			search.slug = musicSearch.slug
		}

		const result = await firebase.firestore().collection("musics").get();

		return res.status(200).json({ musics: result.docs });
	} catch (e) {
		return res.status(500).json({ message: e.toString() });
	}
}
