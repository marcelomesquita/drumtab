import { NextApiRequest, NextApiResponse } from "next";
import nookies from "nookies";
import { firebaseAdmin } from "../../../../adapters/firebaseAdmin";
import { firebase } from "../../../../adapters/firebaseClient";
import User from "../../../../structures/models/User";

export default async function (req: NextApiRequest, res: NextApiResponse) {
	try {
		if (req.method != "POST") {
			return res.status(400).json({ message: "Method not allowed!" });
		}

		const cookies = nookies.get({ req });
		const identity = await firebaseAdmin.auth().verifyIdToken(cookies.token);
		const user: User = new User(req.body);

		user.updatedAt = new Date();

		if (!user.isValid()) {
			return res.status(400).json({ message: "Invalid parameter!" });
		}

		return await firebase
			.firestore()
			.collection("users")
			.doc(user.id)
			.set(Object.assign({}, user))
			.then((result) => res.status(200).json({ message: "Usuário cadastrado!", user: result }))
			.catch((error) => res.status(500).json({ message: error }));
	} catch (e) {
		return res.status(e.statusCode).json({ message: e.toString() });
	}
}
