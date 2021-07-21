import { getSession } from '../../../services/AuthService';
import MusicRepository from '../../../repository/MusicRepository';
import Music from '../../../models/Music';

export default async function musicApi(req, res) {
	try {
		switch (req.method) {
			case 'HEAD':
				return musicExists(req, res);
			case 'GET':
				return musicLoad(req, res);
			case 'PUT':
			case 'POST':
				return musicSave(req, res);
			case 'DELETE':
				return musicDelete(req, res);
			default :
				return res.status(400).json({ error: { code: 400, message: 'Method not allowed!' } });
		}
	} catch (e) {
		return res.status(500).json({ error: { code: 500, message: e.toString() } });
	}
}

async function musicExists(req, res) {
	return MusicRepository.exists(req.query.id)
		.then((result) => ( result ? res.status(200).json() : res.status(204).json() ))
		.catch(() => res.status(500).json({ error: { code: 500, message: 'Não encontrado' } }));
}

async function musicLoad(req, res) {
	return MusicRepository.load(req.query.id)
		.then((result) => {
			if (!result) {
				return res.status(404).json({ error: { code: 404, message: 'Não encontrado' } });
			}

			return res.status(200).json({ music: result });
		})
		.catch((error) => res.status(500).json({ error: { code: 500, message: error } }));
}

async function musicSave(req, res) {
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
}

async function musicDelete(req, res) {
	const session = await getSession({ req });

	if (!session) {
		return { props: { error: { code: 403, message: 'Forbidden' } } };
	}

	return res.status(200).json({ message: "Música deletada!" });
}
