import { NextApiRequest, NextApiResponse } from 'next';
import mongoose from 'mongoose'
import connect from "../../../databases/connect";

interface MusicsSearch {
	title?: string;
	artist?: string,
	album?: string,
	author?: string
}

async function search(req: NextApiRequest, res: NextApiResponse) {
	try {
		await connect();

		const search: MusicsSearch = req.body;
		const result = await mongoose.models.Music.find(search);

		if (result.length === 0) {
			return res.status(404).json({message: "Not Found!"});
		}

		return res.status(200).json({message: "Resultados encontrados", musics: result});
	} catch (e) {
		return res.status(500).json({message: e.toString()});
	}
}

export default async function (req: NextApiRequest, res: NextApiResponse) {
	switch (req.method) {
		case "POST":
			return search(req, res);
		default :
			return res.status(400).json({message: "Method not allowed!"});
	}
}
