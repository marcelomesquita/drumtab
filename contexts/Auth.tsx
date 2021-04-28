import { createContext, useContext, useEffect, useState } from "react";
import nookies from "nookies";
import firebaseClient from "../configs/firebaseClient";
import User from "../structures/models/User";

interface auth {
	user,
	loading,
	signIn?,
	signOut?
};

export const AuthContext = createContext<auth>(null);

export default function AuthProvider({ children }) {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		return firebaseClient.auth().onIdTokenChanged(async (user) => {
			if (!user) {
				setUser(null);
				nookies.set(undefined, 'token', '', { path: '/' });
			} else {
				const token = await user.getIdToken();
				setUser(user);
				nookies.set(undefined, 'token', token, { path: '/' });
			}
		});
	}, []);

	useEffect(() => {
		const handle = setInterval(async () => {
			const user = firebaseClient.auth().currentUser;
			if (user) await user.getIdToken(true);
		}, 10 * 60 * 1000);

		return () => clearInterval(handle);
	}, []);

	const signIn = async () => {
		setLoading(true);

		const provider = new firebaseClient.auth.GoogleAuthProvider();

		firebaseClient.auth().signInWithPopup(provider)
			.then(async (result) => {
				const credential = result.credential;
				const user: User = new User({
					id: result.user.uid,
					name: result.user.displayName,
					email: result.user.email,
					avatar: result.user.photoURL
				});

				//await firebaseClient.firestore().collection("users").doc(user.id).set(Object.assign({}, user))
				//	.then((result) => {
				//		setUser(user);
				//	})
				//	.catch((error) => console.error(error));

				setUser(user);
			})
			.catch((error) => console.error(error))
			.finally(() => setLoading(false));
	}

	const signOut = async () => {
		setLoading(true);

		firebaseClient.auth().signOut()
			.then((result) => {
				setUser(null);
			})
			.catch((error) => console.error(error))
			.finally(() => setLoading(false));
	}

	return (
		<AuthContext.Provider value={{ user, loading, signIn, signOut }}>
			{children}
		</AuthContext.Provider>
	);
}

export const useAuth = () => {
	return useContext(AuthContext);
};
