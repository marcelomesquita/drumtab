import nookies from 'nookies';
import { firebaseAdmin } from '../adapters/firebaseAdmin';

export async function getSession(context) {
	const cookies = nookies.get(context);

	if (!cookies.token) {
		return false;
	}

	const session = await firebaseAdmin.auth().verifyIdToken(cookies.token);

	return session;
}
