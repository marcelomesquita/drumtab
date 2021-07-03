import * as firebaseAdmin from 'firebase-admin';

if (!firebaseAdmin.apps.length) {
	firebaseAdmin.initializeApp({
		credential: firebaseAdmin.credential.cert({
			privateKey: process.env.FIREBASE_PRIVATE_KEY,
			clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
			projectId: process.env.FIREBASE_PROJECT_ID,
		}),
		databaseURL: `https://${process.env.FIREBASE_PROJECT_ID}.firebaseio.com`,
	});
}

export { firebaseAdmin };
