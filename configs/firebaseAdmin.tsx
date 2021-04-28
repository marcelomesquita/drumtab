import * as firebaseAdmin from "firebase-admin";

console.log("FIREBASE_PRIVATE_KEY");
console.log(process.env.FIREBASE_PRIVATE_KEY);

if (!firebaseAdmin.apps.length) {
	firebaseAdmin.initializeApp({
		credential: firebaseAdmin.credential.cert({
			privateKey: process.env.FIREBASE_PRIVATE_KEY,
			clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
			projectId: process.env.FIREBASE_PROJECT_ID
		}),
		databaseURL: `https://${process.env.FIREBASE_PROJECT_ID}.firebaseio.com`,
	});
}

export default firebaseAdmin;
