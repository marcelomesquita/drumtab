import { createContext, useEffect, useState } from "react";
import firebaseConnection from "../configs/firebaseConnection";
import User from "../structures/models/User";

interface session {
	user,
	loading,
	signIn?,
	signOut?
};

const auth: session = null;

export const AuthContext = createContext(auth);

export default function AuthProvider({ children }) {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);

		const storagedUser = localStorage.getItem('user');

		if (storagedUser) {
			setUser(JSON.parse(storagedUser));
		}

		setLoading(false);
	}, []);

	useEffect(() => {
		localStorage.setItem('user', JSON.stringify(user));
	}, [user]);

	const storageUser = (user) => {
		if (user) {
			localStorage.setItem('user', JSON.stringify(user));
		} else {
			localStorage.removeItem('user');
		}
	}

	const signIn = async () => {
		setLoading(true);

		const provider = new firebaseConnection.auth.GoogleAuthProvider();

		firebaseConnection.auth().signInWithPopup(provider)
			.then(async (result) => {
				console.log(result);
				const credential = result.credential;
				const user: User = new User({
					id: result.user.uid,
					name: result.user.displayName,
					email: result.user.email,
					avatar: result.user.photoURL
				});

				//await firebaseConnection.firestore().collection("users").doc(user.id).set(Object.assign({}, user))
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

		firebaseConnection.auth().signOut()
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
