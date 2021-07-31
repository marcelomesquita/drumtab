import Head from 'next/head';
import Link from 'next/link';
import moment from 'moment';
import Container from '../../components/layout/Container'
import Breadcrumb from '../../components/helpers/Breadcrumb';
import Drummer from '../../components/shared/Drummer';
import Drum from '../../models/Drum';
import Sample from '../../models/Sample';
import Tablature from '../../models/Tablature';
import SamplesRepository from '../../repository/SamplesRepository';

export async function getStaticPaths() {
	return {
		paths: [],
		fallback: 'blocking'
	}
}

export async function getStaticProps(context) {
	const sample = await SamplesRepository.load(context.params.id);

	return {
		props: {
			sample
		}
	}
}

export default function SamplePage(props) {
	const drum = new Drum();
	const sample = new Sample(props.sample);
	const tablature = new Tablature(sample.tablature);
	const pageTitle = sample.name;

	return (
		<Container>
			<Head>
				<title>{pageTitle} | {process.env.NEXT_PUBLIC_TITLE}</title>
				<meta property='description' content={`Tablatura de bateria do sample ${sample.name} por ${sample.createdBy.name}`} />
			</Head>

			<div className='container is-widescreen'>
				<section className='section is-clearfix'>
					<Breadcrumb />

					<Link href={`/samples/editor/?id=${sample.id}`}>
						<a className='button is-outlined is-small is-right'>editar</a>
					</Link>

					<h1 className='title is-1'>{sample.name}</h1>
					<h2 className='subtitle has-text-grey'>{sample.createdBy.name}</h2>

					<div className='tags'>
						<span className='tag is-primary'>double tap</span>
						<span className='tag is-primary'>paradidle</span>
						<span className='tag is-primary'>chops</span>
					</div>
				</section>
			</div>

			<div className='container is-fluid has-background-grey-lighter'>
				<Drummer drum={drum} tablature={tablature} edit={false} />
			</div>

			<div className='container is-widescreen'>
				<section className='section'>
					<p className='content is-small has-text-grey'>Enviado por <a className='has-text-dark has-text-weight-bold'>{sample.createdBy?.name}</a> em {moment(sample.createdAt).format('DD/MM/YYYY')}</p>
				</section>
			</div>
		</Container>
	)
}
