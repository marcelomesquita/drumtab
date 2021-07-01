import { NextApiRequest, NextApiResponse } from 'next';
import UserRepository from 'repository/UserRepository';

export default async function (req: NextApiRequest, res: NextApiResponse) {
	try {
		if (req.method !== 'GET') {
			return res.status(400).json({ error: { code: 400, message: 'Method not allowed!' } });
		}

		return UserRepository.load(req.query.id as string)
			.then((result) => res.status(200).json({ user: result }))
			.catch((error) => res.status(500).json({ error: { code: 500, message: error } }));
	} catch (e) {
		return res.status(500).json({ error: { code: 500, message: e.toString() } });
	}
}
