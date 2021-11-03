import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Container from 'components/layout/Container';
import Breadcrumb from 'components/helpers/Breadcrumb';
import Musics from 'components/shared/Musics';
import MusicService from 'services/MusicService';

export default function MusicsPage(props) {
	const pageTitle = 'Músicas';

	const [musics, setMusics] = useState([]);
	const [search, setSearch] = useState();
	const [order, setOrder] = useState('name');
	const [last, setLast] = useState('');
	const [limit, setLimit] = useState(10);
	const [loading, setLoading] = useState(false);
	const [finish, setFinish] = useState(false);

	useEffect(() => searchMusics(), []);

	const searchMusics = () => {
		setLoading(true);

		MusicService.search(search, last, order, limit)
			.then((snapshot) => {
				setMusics(musics.concat(snapshot));
				setLast(snapshot[snapshot.length - 1][order]);

				if (snapshot.length < limit) {
					setFinish(true);
				}
			})
			.catch((error) => ({ props: { error: { code: error.code, message: error.message } } }))
			.finally(() => setLoading(false));
	}

	return (
		<Container>
			<Head>
				<title>{pageTitle} | {process.env.NEXT_PUBLIC_TITLE}</title>
				<meta property='description' content='Aprenda a tocar aquela música que você adora' key='description' />
			</Head>

			<div className='container is-widescreen'>
				<section className='section'>
					<Breadcrumb />

					<h1 className='title is-1'>{pageTitle}</h1>
					<h2 className='subtitle'>Não encontrou a música que queria? Que tal <Link href='/musics/editor'><a>cadastrá-la!</a></Link></h2>

					<Musics musics={musics} />

					<button className={`button is-fullwidth ${loading && 'is-loading'}`} disabled={finish} onClick={searchMusics}>carregar mais</button>
				</section>
			</div>
		</Container>
	);
}
