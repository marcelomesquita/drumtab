import { NextApiRequest, NextApiResponse } from 'next';
import MusicRepository from 'repository/MusicRepository';

export default async function (req: NextApiRequest, res: NextApiResponse) {
	try {
		if (req.method !== 'GET') {
			return res.status(400).json({ error: { code: 400, message: 'Method not allowed!' } });
		}

		return MusicRepository.load(req.query.id as string)
			.then((result) => {
				if (!result) {
					return res.status(404).json({ error: { code: 404, message: 'Não encontrado' } });
				}

				return res.status(200).json({ music: result });
			})
			.catch((error) => res.status(500).json({ error: { code: 500, message: error } }));
	} catch (e) {
		return res.status(500).json({ error: { code: 500, message: e.toString() } });
	}
}
