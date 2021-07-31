import Error from 'next/error';
import Container from '../components/layout/Container';
import { getSession } from '../services/AuthService';

export async function getStaticProps(context) {
	try {
		const session = await getSession(context);

		if (!session) {
			return { props: { error: { code: 403, message: 'You must login to access this page' } } };
		}

		return { props: {} }
	} catch (error) {
		return { redirect: { destination: '/', permanent: false, } }
	}
}

export default function AdminPage(props) {
	if (props.error) {
		return <Error statusCode={props.error.code} title={props.error.message} />;
	}

	return <Container>index</Container>;
}
