import nookies from 'nookies';
import { firebaseAdmin } from '../../../../adapters/firebaseAdmin';
import User from '../../../../models/User';
import UserRepository from '../../../../repository/UserRepository';

export default async function (req, res) {
	try {
		if (req.method != 'POST') {
			return res.status(400).json({ error: { code: 400, message: 'Method not allowed!' } });
		}

		const cookies = nookies.get({ req });

		if (!cookies.token) {
			throw { code: 403, message: 'Forbidden' };
		}

		await firebaseAdmin.auth().verifyIdToken(cookies.token);

		const user = new User(req.body);

		if (!user.isValid()) {
			return res.status(500).json({ error: { code: 500, message: 'Invalid parameter!' } });
		}

		return UserRepository.save(user)
			.then((result) => res.status(200).json({ user: result }))
			.catch((error) => res.status(500).json({ error: { code: 500, message: error } }));
	} catch (e) {
		return res.status(500).json({ error: { code: 500, message: e.toString() } });
	}
}
