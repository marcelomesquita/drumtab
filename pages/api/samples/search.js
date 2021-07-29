import SamplesRepository from '../../../repository/SamplesRepository';

export default async function SampleSearchApi(req, res) {
	try {
		if (req.method !== 'GET') {
			return res.status(400).json({ error: { code: 400, message: 'Method not allowed!' } });
		}

		const search = req.query.search ? req.query.search : null;
		const last = req.query.last ? req.query.last : '';
		const order = req.query.order ? req.query.order : 'name';
		const limit = req.query.limit ? req.query.limit : 10;

		const samples = await SamplesRepository.search(search, last, order, limit);

		return res.status(200).json({ samples });
	} catch (e) {
		return res.status(500).json({ error: { code: 500, message: e.toString() } });
	}
}
