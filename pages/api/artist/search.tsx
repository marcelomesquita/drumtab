import { NextApiRequest, NextApiResponse } from 'next';
import mongoose from 'mongoose'
import connect from "../../../databases/connect";
import { ArtistSearch } from '../../../models/search/artist-search';

export default async function (req: NextApiRequest, res: NextApiResponse) {
	try {
		if (req.method !== "POST") {
			return res.status(400).json({ status: 400, message: "Method not allowed!" });
		}

		await connect();

		const search: ArtistSearch = req.body;
		const result = await mongoose.models.Artist.find(search);

		if (result.length === 0) {
			return res.status(404).json({ status: 404, message: "Not Found!" });
		}

		return res.status(200).json({ status: 200, message: "Resultados encontrados", artists: result });
	} catch (e) {
		return res.status(500).json({ status: 500, message: e.toString() });
	}
}
