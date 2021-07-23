import { getSession } from '../../../services/AuthService';
import AlbumRepository from '../../../repository/AlbumRepository';
import Album from '../../../models/Album';

export default async function albumApi(req, res) {
	try {
		switch (req.method) {
			case 'HEAD':
				return albumExists(req, res);
			case 'GET':
				return albumLoad(req, res);
			case 'POST':
			case 'PUT':
				return albumSave(req, res);
			case 'DELETE':
				return albumDelete(req, res);
			default :
				return res.status(400).json({ error: { code: 400, message: 'Method not allowed!' } });
		}
	} catch (e) {
		return res.status(500).json({ error: { code: 500, message: e.toString() } });
	}
}

async function albumExists(req, res) {
	return AlbumRepository.exists(req.query.id)
		.then((result) => ( result ? res.status(200).json() : res.status(204).json() ))
		.catch((error) => res.status(500).json({ error: { code: 500, message: error } }));
}

async function albumLoad(req, res) {
	return AlbumRepository.load(req.query.id)
		.then((result) => {
			if (!result) {
				return res.status(404).json({ error: { code: 404, message: 'Não encontrado' } });
			}

			return res.status(200).json({ album: result });
		})
		.catch((error) => res.status(500).json({ error: { code: 500, message: error } }));
}

async function albumSave(req, res) {
	const session = await getSession({ req });

	if (!session) {
		return { props: { error: { code: 403, message: 'Forbidden' } } };
	}

	const album = new Album(req.body);

	if (!album.isValid()) {
		return res.status(400).json({ error: { code: 400, message: 'Invalid parameter!' } });
	}

	await AlbumRepository.save(album, session);

	return res.status(200).json({ message: 'Albúm salvo!' });
}

async function albumDelete(req, res) {
	const session = await getSession({ req });

	if (!session) {
		return { props: { error: { code: 403, message: 'Forbidden' } } };
	}

	return res.status(200).json({ message: "Albúm deletado!" });
}
