import { Db } from 'mongodb';
import connect from '../../../components/util/database';

interface MusicSearch {
	title?: string;
	artist?: string,
	album?: string,
	author?: string
}

export default async function (request, response) {
	if (request.method === 'GET') {
		const search: MusicSearch = request.body;
		const db: Db = await connect();
		const result = await db.collection('musics').find(search).toArray();

		if (result.length === 0) {
			return response.status(404).json({message: "Not Found!"});
		}

		return response.status(200).json({message: result});
	} else {
		return response.status(400).json({message: "Method not allowed!"});
	}
}
