import { NextApiRequest, NextApiResponse } from 'next';
import mongoose from 'mongoose'
import mongoConnection from "../../../configs/mongoConnection";
import AlbumSearch from '../../../structures/models/search/AlbumSearch';

interface search {
	name?,
	slug?
}

export default async function (req: NextApiRequest, res: NextApiResponse) {
	try {
		if (req.method !== "POST") {
			return res.status(400).json({ message: "Method not allowed!" });
		}

		await mongoConnection();

		let albumSearch: AlbumSearch = req.body;
		let search: search = {};

		if (albumSearch?.name) {
			search.name = { "$regex": albumSearch.name, "$options": "i" }
		}

		if (albumSearch?.slug) {
			search.slug = albumSearch.slug
		}

		const result = await mongoose.models.Album.find(search);

		if (result.length === 0) {
			return res.status(404).json({ message: "Not Found!" });
		}

		return res.status(200).json({ message: "Resultados encontrados", albums: result });
	} catch (e) {
		return res.status(500).json({ message: e.toString() });
	}
}
