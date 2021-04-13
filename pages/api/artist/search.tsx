import { NextApiRequest, NextApiResponse } from 'next';
import mongoose from 'mongoose'
import connect from "../../../databases/connect";
import ArtistSearch from '../../../models/search/artist-search';

export default async function (req: NextApiRequest, res: NextApiResponse) {
	try {
		if (req.method !== "POST") {
			return res.status(400).json({ message: "Method not allowed!" });
		}

		await connect();

		const search: ArtistSearch = req.body;
		const result = await mongoose.models.Artist.find({
			"name": { "$regex": search.name, "$options": "i" }
		});

		if (result.length === 0) {
			return res.status(404).json({ message: "Not Found!" });
		}

		return res.status(200).json({ message: "Resultados encontrados", artists: result });
	} catch (e) {
		return res.status(500).json({ message: e.toString() });
	}
}
