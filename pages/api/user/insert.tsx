import { NextApiRequest, NextApiResponse } from "next";
import firebaseConnection from "../../../configs/firebaseConnection";
import User from "../../../structures/models/User";

export default async function (req: NextApiRequest, res: NextApiResponse) {
	try {
		if (req.method != "POST") {
			return res.status(400).json({ message: "Method not allowed!" });
		}

//		const session: Session = await getSession({ req });
//
//		if (!session) {
//			return res.status(401).json({ message: "Unauthorized!" });
//		}

		const user: User = new User(req.body);

		if (!user.isValid()) {
			return res.status(400).json({ message: "Invalid parameter!" });
		}

		await firebaseConnection.firestore().collection("users").doc(user.id).set(Object.assign({}, user))
			.then((result) => {
				console.log(result);
				return res.status(200).json({ message: "Usuário cadastrado!", user: result });
			})
			.catch((error) => {
				console.error(error);
				return res.status(500).json({ message: error });
			});
	} catch (e) {
		return res.status(500).json({ message: e.toString() });
	}
}
