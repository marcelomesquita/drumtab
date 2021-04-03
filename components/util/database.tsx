import { Db, MongoClient } from 'mongodb'

const client = new MongoClient(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });

async function Connect(): Promise<Db> {
	if (!client.isConnected()) {
		await client.connect();
	}

	return client.db('drumtab');
}

export default Connect;
