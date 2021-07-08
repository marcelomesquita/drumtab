import MusicRepository from '../../../../repository/MusicRepository';
import { getSession } from '../../../../services/AuthService';
import Music from '../../../../models/Music';

export default async function (req, res) {
	try {
		if (req.method != 'PUT') {
			return res.status(400).json({ error: { code: 400, message: 'Method not allowed!' } });
		}

		const session = await getSession({ req });

		if (!session) {
			return { props: { error: { code: 403, message: 'Forbidden' } } };
		}

		const music = new Music(req.body);

		if (!music.isValid()) {
			return res.status(400).json({ error: { code: 400, message: 'Invalid parameter!' } });
		}

		await MusicRepository.save(music, session);

		return res.status(200).json({ message: 'Música salva!' });
	} catch (e) {
		return res.status(500).json({ error: { code: 500, message: e.toString() } });
	}
}
