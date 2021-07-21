import User from '../../../models/User';
import UserRepository from '../../repository/UserRepository';

export default async function userApi(req, res) {
	try {
		switch (req.method) {
			case 'HEAD':
				return userExists(req, res);
			case 'GET':
				return userLoad(req, res);
			case 'PUT':
			case 'POST':
				return userSave(req, res);
			case 'DELETE':
				return userDelete(req, res);
			default :
				return res.status(400).json({ error: { code: 400, message: 'Method not allowed!' } });
		}
	} catch (e) {
		return res.status(500).json({ error: { code: 500, message: e.toString() } });
	}
}

async function userExists(req, res) {
	return UserRepository.exists(req.query.id)
		.then((result) => ( result ? res.status(200).json() : res.status(204).json() ))
		.catch(() => res.status(500).json({ error: { code: 500, message: 'Não encontrado' } }));
}


async function userLoad(req, res) {
	return UserRepository.load(req.query.id)
		.then((result) => {
			if (!result) {
				return res.status(404).json({ error: { code: 404, message: 'Não encontrado' } });
			}

			return res.status(200).json({ user: result });
		})
		.catch((error) => res.status(500).json({ error: { code: 500, message: error } }));
}

async function userSave(req, res) {
	const session = await getSession({ req });

	if (!session) {
		return { props: { error: { code: 403, message: 'Forbidden' } } };
	}

	const user = new User(req.body);

	if (!user.isValid()) {
		return res.status(400).json({ error: { code: 400, message: 'Invalid parameter!' } });
	}

	await UserRepository.save(user);

	return res.status(200).json({ message: 'Usuário salvo!' });
}

async function userDelete(req, res) {
	const session = await getSession({ req });

	if (!session) {
		return { props: { error: { code: 403, message: 'Forbidden' } } };
	}

	return res.status(200).json({ message: "Usuário deletado!" });
}
