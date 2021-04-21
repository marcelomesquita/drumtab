import { NextApiRequest, NextApiResponse } from 'next';
import mongoose from 'mongoose'
import connect from "../../../databases/connect";
import MusicSearch from '../../../models/search/music-search';

interface search {
	name?,
	slug?
}

export default async function (req: NextApiRequest, res: NextApiResponse) {
	try {
		if (req.method !== "GET") {
			return res.status(400).json({ message: "Method not allowed!" });
		}

		await connect();

		let musicSearch: MusicSearch = req.body;
		let search: search = {};

		if (musicSearch?.name) {
			search.name = { "$regex": musicSearch.name, "$options": "i" }
		}

		if (musicSearch?.slug) {
			search.slug = musicSearch.slug
		}

		const result = await mongoose.models.Music.find(search).populate("artist");

		if (result.length === 0) {
			return res.status(404).json({ message: "Not Found!" });
		}

		return res.status(200).json({ message: "Resultados encontrados", musics: result });
	} catch (e) {
		return res.status(500).json({ message: e.toString() });
	}
}
