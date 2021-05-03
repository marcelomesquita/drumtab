import { useContext } from "react";
import Error from 'next/error'
import nookies from "nookies";
import Container from "../components/layout/Container"
import firebaseAdmin from "../configs/firebaseAdmin";
import firebaseClient from "../configs/firebaseClient";
import { AuthContext } from "../contexts/Auth";

//export async function getStaticProps(context) {
//	try {
//		const cookies = nookies.get(context);
//
//		await firebaseAdmin.auth().verifyIdToken(cookies.token);
//
//		return {
//			props: {}
//		}
//	} catch (error) {
//		return {
//			redirect: {
//				destination: "/",
//				permanent: false,
//			}
//		}
//	}
//}

export default function AdminPage(props) {
	const auth = useContext(AuthContext);

	if (!auth.user) {
		return <Error statusCode={401} />
	}

	return (
		<Container>
			index
		</Container>
	)
}
