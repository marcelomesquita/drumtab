import { getSession } from '../../../services/AuthService';
import ArtistRepository from '../../../repository/ArtistRepository';
import Artist from '../../../models/Artist';

export default async function artistApi(req, res) {
	try {
		switch (req.method) {
			case 'HEAD':
				return artistExists(req, res);
			case 'GET':
				return artistLoad(req, res);
			case 'POST':
			case 'PUT':
				return artistSave(req, res);
			case 'DELETE':
				return artistDelete(req, res);
			default :
				return res.status(400).json({ error: { code: 400, message: 'Method not allowed!' } });
		}
	} catch (e) {
		return res.status(500).json({ error: { code: 500, message: e.toString() } });
	}
}

async function artistExists(req, res) {
	return ArtistRepository.exists(req.query.id)
		.then((result) => ( result ? res.status(200).json() : res.status(204).json() ))
		.catch((error) => res.status(500).json({ error: { code: 500, message: error } }));
}

async function artistLoad(req, res) {
	return ArtistRepository.load(req.query.id)
		.then((result) => {
			if (!result) {
				return res.status(404).json({ error: { code: 404, message: 'Não encontrado' } });
			}

			return res.status(200).json({ artist: result });
		})
		.catch((error) => res.status(500).json({ error: { code: 500, message: error } }));
}

async function artistSave(req, res) {
	const session = await getSession({ req });

	if (!session) {
		return { props: { error: { code: 403, message: 'Forbidden' } } };
	}

	const artist = new Artist(req.body);

	if (!artist.isValid()) {
		return res.status(400).json({ error: { code: 400, message: 'Invalid parameter!' } });
	}

	await ArtistRepository.save(artist, session);

	return res.status(200).json({ message: 'Artista salvo!' });
}

async function artistDelete(req, res) {
	const session = await getSession({ req });

	if (!session) {
		return { props: { error: { code: 403, message: 'Forbidden' } } };
	}

	return res.status(200).json({ message: "Artista deletado!" });
}
