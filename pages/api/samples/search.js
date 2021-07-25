import SamplesRepository from '../../../repository/SamplesRepository';

export default async function SampleSearchApi(req, res) {
	try {
		if (req.method !== 'POST') {
			return res.status(400).json({ error: { code: 400, message: 'Method not allowed!' } });
		}

		const samples = SamplesRepository.listByPopularity();

		return res.status(200).json({ samples });
	} catch (e) {
		return res.status(500).json({ error: { code: 500, message: e.toString() } });
	}
}
