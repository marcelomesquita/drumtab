import Error from 'next/error'
import Container from "../components/layout/Container"
import { useAuth } from "../contexts/Auth";

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
	const auth = useAuth();

	if (!auth.user) {
		return <Error statusCode={401} />
	}

	return (
		<Container>
			index
		</Container>
	)
}
