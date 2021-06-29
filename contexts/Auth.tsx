import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import nookies from 'nookies';
import { firebase } from 'adapters/firebaseClient';
import User from 'structures/models/User';
import UserService from 'services/UserService';

interface auth {
	user;
	loading;
	signIn?;
	signOut?;
}

const AuthContext = createContext<auth>(null);

export const useAuth = () => {
	return useContext(AuthContext);
};

export default function AuthProvider(props) {
	const router = useRouter();
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		firebase.auth().onIdTokenChanged(async (user) => {
			if (user) {
				const token = await user.getIdToken();
				nookies.set(undefined, 'token', token, { path: '/' });
				setUser(formatUser(user));
			} else {
				nookies.destroy(undefined, 'token');
				setUser(null);
			}
		});
	}, []);

	const formatUser = (user) => {
		return new User({
			id: user.uid,
			name: user.displayName,
			email: user.email,
			avatar: user.photoURL,
			createdAt: new Date(user.metadata.creationTime),
		});
	};

	const registerUser = async (user: User) => {
		await UserService.save(user).catch((error) => toast.dark(error));
	};

	const signIn = async (redirect: string = '/') => {
		setLoading(true);

		await firebase
			.auth()
			.signInWithPopup(new firebase.auth.GoogleAuthProvider())
			.then(async (result) => await registerUser(formatUser(result.user)))
			.catch((error) => toast.dark(error))
			.finally(() => setLoading(false));
	};

	const signOut = async () => {
		setLoading(true);

		await firebase
			.auth()
			.signOut()
			.catch((error) => toast.dark(error))
			.finally(() => setLoading(false));
	};

	return <AuthContext.Provider value={{ user, loading, signIn, signOut }}>{props.children}</AuthContext.Provider>;
}
