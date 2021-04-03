import { Db } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import connect from '../../../components/util/database';

interface MusicSearch {
	title?: string;
	artist?: string,
	album?: string,
	author?: string
}

async function search(req: NextApiRequest, res: NextApiResponse) {
	try {
		const search: MusicSearch = req.body;
		const db: Db = await connect();
		const result = await db.collection('musics').find(search).toArray();

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
		case "GET":
		case "POST":
			return search(req, res);
		default :
			return res.status(400).json({message: "Method not allowed!"});
	}
}
