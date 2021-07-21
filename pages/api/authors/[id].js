import { getSession } from '../../../services/AuthService';
import AuthorRepository from '../../../repository/AuthorRepository';
import Author from '../../../models/Author';

export default async function authorApi(req, res) {
	try {
		switch (req.method) {
			case 'HEAD':
				return authorExists(req, res);
			case 'GET':
				return authorLoad(req, res);
			case 'POST':
			case 'PUT':
				return authorSave(req, res);
			case 'DELETE':
				return authorDelete(req, res);
			default :
				return res.status(400).json({ error: { code: 400, message: 'Method not allowed!' } });
		}
	} catch (e) {
		return res.status(500).json({ error: { code: 500, message: e.toString() } });
	}
}

async function authorExists(req, res) {
	return AuthorRepository.exists(req.query.id)
		.then((result) => ( result ? res.status(200).json() : res.status(204).json() ))
		.catch(() => res.status(500).json({ error: { code: 500, message: 'Não encontrado' } }));
}

async function authorLoad(req, res) {
	return AuthorRepository.load(req.query.id)
		.then((result) => {
			if (!result) {
				return res.status(404).json({ error: { code: 404, message: 'Não encontrado' } });
			}

			return res.status(200).json({ author: result });
		})
		.catch((error) => res.status(500).json({ error: { code: 500, message: error } }));
}

async function authorSave(req, res) {
	const session = await getSession({ req });

	if (!session) {
		return { props: { error: { code: 403, message: 'Forbidden' } } };
	}

	const author = new Author(req.body);

	if (!author.isValid()) {
		return res.status(400).json({ error: { code: 400, message: 'Invalid parameter!' } });
	}

	await AuthorRepository.save(author, session);

	return res.status(200).json({ message: 'Música salva!' });
}

async function authorDelete(req, res) {
	const session = await getSession({ req });

	if (!session) {
		return { props: { error: { code: 403, message: 'Forbidden' } } };
	}

	return res.status(200).json({ message: "Música deletada!" });
}
