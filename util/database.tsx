import { MongoClient } from 'mongodb'

const client = new MongoClient(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });

async function Connect() {
	if (!client.isConnected()) {
		await client.connect();
	}

	const db = client.db('drumtab');

	return { db, client };
}

export default Connect;
