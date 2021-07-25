import React from 'react';
import Error from 'next/error';
import Head from 'next/head';
import Container from '../../components/layout/Container';
import Breadcrumb from '../../components/helpers/Breadcrumb';
import SampleForm from '../../components/shared/SampleForm';
import SamplesRepository from '../../repository/SamplesRepository';
import { getSession } from '../../services/AuthService';

export async function getServerSideProps(context) {
	try {
		const id = context.query?.id;
		const session = await getSession(context);

		if (!session) {
			return { props: { error: { code: 403, message: 'You must login to access this page' } } };
		}

		if (id) {
			return SamplesRepository.load(id)
				.then((result) => ({ props: { sample: result } }))
				.catch(() => ({ props: { error: { code: 404, message: 'Page not found' } } }));
		}

		return { props: {} };
	} catch (e) {
		return { props: { error: { code: 500, message: e.toString() } } };
	}
}

export default function SamplesEditorPage(props) {
	if (props.error) {
		return <Error statusCode={props.error.code} title={props.error.message} />;
	}

	const pageTitle = props.sample ? `Atualizar Sample "${props.sample.name}"` : 'Cadastrar Sample';

	return (
		<Container>
			<Head>
				<title>{pageTitle} | {process.env.NEXT_PUBLIC_TITLE}</title>
			</Head>

			<div className='container is-widescreen'>
				<section className='section is-clearfix'>
					<Breadcrumb />

					<h1 className='title'>{pageTitle}</h1>
				</section>
			</div>

			<SampleForm sample={props.sample} />
		</Container>
	);
}
