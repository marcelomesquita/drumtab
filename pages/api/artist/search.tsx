import { NextApiRequest, NextApiResponse } from 'next';
import mongoose from 'mongoose'
import connect from "../../../databases/connect";
import ArtistSearch from '../../../models/search/artist-search';

interface search {
	name?,
	slug?
}

export default async function (req: NextApiRequest, res: NextApiResponse) {
	try {
		if (req.method !== "GET") {
			//return res.status(400).json({ message: "Method not allowed!" });
		}

		await connect();

		let artistSearch: ArtistSearch = req.body;
		let search: search = {};

		if (artistSearch?.name) {
			search.name = { "$regex": artistSearch.name, "$options": "i" }
		}

		if (artistSearch?.slug) {
			search.slug = artistSearch.slug
		}

		const result = await mongoose.models.Artist.find(search);

		if (result.length === 0) {
			return res.status(404).json({ message: "Not Found!" });
		}

		return res.status(200).json({ message: "Resultados encontrados", artists: result });
	} catch (e) {
		return res.status(500).json({ message: e.toString() });
	}
}
