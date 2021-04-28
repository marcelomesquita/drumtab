import { NextApiRequest, NextApiResponse } from 'next';
import AuthorSearch from '../../../structures/models/search/AuthorSearch';

interface search {
	name?,
	slug?
}

export default async function (req: NextApiRequest, res: NextApiResponse) {
	try {
		if (req.method !== "POST") {
			return res.status(400).json({ message: "Method not allowed!" });
		}

		return res.status(200).json({ message: "Resultados encontrados", authors: [] });

//		let authorSearch: AuthorSearch = req.body;
//		let search: search = {};
//
//		if (authorSearch?.name) {
//			search.name = { "$regex": authorSearch.name, "$options": "i" }
//		}
//
//		if (authorSearch?.slug) {
//			search.slug = authorSearch.slug
//		}
//
//		const result = await mongoose.models.Author.find(search);
//
//		if (result.length === 0) {
//			return res.status(404).json({ message: "Not Found!" });
//		}
//
//		return res.status(200).json({ message: "Resultados encontrados", authors: result });
	} catch (e) {
		return res.status(500).json({ message: e.toString() });
	}
}
