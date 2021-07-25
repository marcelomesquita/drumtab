import { getSession } from '../../../services/AuthService';
import SamplesRepository from '../../../repository/SamplesRepository';
import Sample from '../../../models/Sample';

export default async function sampleApi(req, res) {
	try {
		switch (req.method) {
			case 'HEAD':
				return sampleExists(req, res);
			case 'GET':
				return sampleLoad(req, res);
			case 'PUT':
			case 'POST':
				return sampleSave(req, res);
			case 'DELETE':
				return sampleDelete(req, res);
			default :
				return res.status(400).json({ error: { code: 400, message: 'Method not allowed!' } });
		}
	} catch (e) {
		return res.status(500).json({ error: { code: 500, message: e.toString() } });
	}
}

async function sampleExists(req, res) {
	return SamplesRepository.exists(req.query.id)
		.then((result) => ( result ? res.status(200).json() : res.status(204).json() ))
		.catch(() => res.status(500).json({ error: { code: 500, message: 'Não encontrado' } }));
}

async function sampleLoad(req, res) {
	return SamplesRepository.load(req.query.id)
		.then((result) => {
			if (!result) {
				return res.status(404).json({ error: { code: 404, message: 'Não encontrado' } });
			}

			return res.status(200).json({ sample: result });
		})
		.catch((error) => res.status(500).json({ error: { code: 500, message: error } }));
}

async function sampleSave(req, res) {
	const session = await getSession({ req });

	if (!session) {
		return { props: { error: { code: 403, message: 'Forbidden' } } };
	}

	const sample = new Sample(req.body);

	if (!sample.isValid()) {
		return res.status(400).json({ error: { code: 400, message: 'Invalid parameter!' } });
	}

	await SamplesRepository.save(sample, session);

	return res.status(200).json({ message: 'Sample salvo!' });
}

async function sampleDelete(req, res) {
	const session = await getSession({ req });

	if (!session) {
		return { props: { error: { code: 403, message: 'Forbidden' } } };
	}

	return res.status(200).json({ message: "Sample deletado!" });
}
