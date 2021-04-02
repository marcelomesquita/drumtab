import connect from '../../../components/util/database';

async function CreateUser(request, response) {
	if (request.method === 'POST') {
		const { name } = request.body;

		if (!name) {
			response.status(400).json({message: "Invalid parameter!"});

			return;
		}

		const { db } = await connect();
		const result = await db.collection('users').insertOne({ name });

		response.status(200).json({message: result});
	} else {
		response.status(400).json({message: "Method not allowed!"});
	}
}

export default CreateUser;
