import React from 'react';
import Error from 'next/error';
import Head from 'next/head';
import Container from '../../components/layout/Container';
import Breadcrumb from '../../components/helpers/Breadcrumb';
import MusicForm from '../../components/shared/MusicForm';
import MusicRepository from '../../repository/MusicRepository';
import { getSession } from '../../services/AuthService';

export async function getServerSideProps(context) {
	try {
		const id = context.query?.id;
		const session = await getSession(context);

		if (!session) {
			return { props: { error: { code: 403, message: 'You must login to access this page' } } };
		}

		if (id) {
			return MusicRepository.load(id)
				.then((result) => ({ props: { music: result } }))
				.catch(() => ({ props: { error: { code: 404, message: 'Page not found' } } }));
		}

		return { props: {} };
	} catch (e) {
		return { props: { error: { code: 500, message: e.toString() } } };
	}
}

export default function MusicEditorPage(props) {
	if (props.error) {
		return <Error statusCode={props.error.code} title={props.error.message} />;
	}

	const pageTitle = props.music ? `Atualizar Música "${props.music.name}"` : 'Cadastrar Música';

	return (
		<Container>
			<Head>
				<title>{pageTitle} | {process.env.NEXT_PUBLIC_TITLE}</title>
				<meta property='description' content='Crie a tablatura de bateria daquela música que você adora' />
			</Head>

			<div className='container is-widescreen'>
				<section className='section is-clearfix'>
					<Breadcrumb />

					<h1 className='title'>{pageTitle}</h1>
				</section>
			</div>

			<MusicForm music={props.music} />
		</Container>
	);
}
