import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Container from '../../components/layout/Container';
import Breadcrumb from '../../components/helpers/Breadcrumb';
import Pagination from '../../components/helpers/Pagination';
import SamplesRepository from '../../repository/SamplesRepository';

export async function getStaticProps(context) {
	const samples = await SamplesRepository.list();

	return {
		props: {
			samples,
		},
	};
}

export default function SamplesPage(props) {
	const pageTitle = 'Samples';
	const samples = props.samples;

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
							{samples.map((sample) => {
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

					<Pagination />
				</section>
			</div>
		</Container>
	);
}
