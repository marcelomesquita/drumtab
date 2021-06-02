import { NextApiRequest, NextApiResponse } from 'next';
import AlbumRepository from '../../../repository/AlbumRepository';

export default async function (req: NextApiRequest, res: NextApiResponse) {
	try {
		if (req.method !== "POST") {
			return res.status(400).json({ message: "Method not allowed!" });
		}

		return AlbumRepository
			.listByName(req.body.name)
			.then((result) => res.status(200).json({ message: "Resultados encontrados", albums: result }))
			.catch((error) => res.status(500).json({ message: error }));
	} catch (e) {
		return res.status(500).json({ message: e.toString() });
	}
}
