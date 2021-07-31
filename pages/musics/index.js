import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Container from '../../components/layout/Container';
import Breadcrumb from '../../components/helpers/Breadcrumb';
import MusicService from '../../services/MusicService';

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

					<div className='columns is-multiline'>
						{musics.map((music) => {
							return (
								<div key={music.id} className='column is-4'>
									<Link href={`/musics/${music.id}`}>
										<a>
											<div className='card'>
												<div className='card-image'>
													<figure className='image'>
														<Image src={`/assets/images/artists/${music.artist.id}.jpg`} alt={music.artist.name} width={400} height={400} />
													</figure>
												</div>
												<div className='card-content'>
													<div className='content'>
														<p className='title is-5'>{music.name}</p>
														<p className='subtitle is-6'>{music.artist.name}</p>
													</div>
												</div>
											</div>
										</a>
									</Link>
								</div>
							);
						})}
					</div>

					<button className={`button is-fullwidth ${loading && 'is-loading'}`} disabled={finish} onClick={searchMusics}>carregar mais</button>
				</section>
			</div>
		</Container>
	);
}
