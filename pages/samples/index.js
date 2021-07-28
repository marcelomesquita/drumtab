import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Container from '../../components/layout/Container';
import Breadcrumb from '../../components/helpers/Breadcrumb';
import SamplesService from '../../services/SamplesService';

export default function SamplesPage(props) {
	const pageTitle = 'Samples';

	const [samples, setSamples] = useState([]);
	const [search, setSearch] = useState();
	const [order, setOrder] = useState('name');
	const [last, setLast] = useState();
	const [limit, setLimit] = useState(10);
	const [loading, setLoading] = useState(false);
	const [finish, setFinish] = useState(false);

	useEffect(() => searchSamples(), []);

	const searchSamples = () => {
		setLoading(true);

		SamplesService.search(search, order, last, limit)
			.then((snapshot) => {
				setSamples(samples.concat(snapshot));
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
			</Head>

			<div className='container is-widescreen'>
				<section className='section'>
					<Breadcrumb />

					<h1 className='title'>{pageTitle}</h1>
					<h2 className='subtitle'>Tem uma batida que vai fazer outros pirarem? Que tal <Link href='/samples/editor'><a>cadastrá-la!</a></Link></h2>

					<div className='columns'>
						<div className='column'>
							{samples && samples.map((sample) => {
								return (
									<Link key={`sample-${sample.id}`} href={`/sample/${sample.id}`}>
										<a className='has-text-primary'>
											<div className='box is-shadowless'>
												<div className='is-pulled-left mr-3'>
													<figure className='image is-48x48'>
														<Image src={sample.createdBy.avatar} alt={sample.createdBy.name} width={50} height={50} className='is-rounded' />
													</figure>
												</div>
												<h3 className='title is-5 mb-0'>{sample.name}</h3>
												<p>{sample.createdBy.name}</p>
											</div>
										</a>
									</Link>
								);
							})}
						</div>
					</div>

					<button className={`button is-fullwidth ${loading && 'is-loading'}`} disabled={finish} onClick={searchSamples}>carregar mais</button>
				</section>
			</div>
		</Container>
	);
}
