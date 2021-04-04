import Head from 'next/head';
import Link from 'next/link';
import moment from 'moment';
import Container from '../../components/layout/container'
import Breadcrumb from '../../components/shared/breadcrumb';
import Drummer from '../../components/shared/drummer';
import { Tablature } from '../../models/tablature';
import { Drum } from '../../models/drum';
import { PROJECT } from '../../models/project';

export async function getStaticPaths() {
	return {
		paths: [],
		fallback: 'blocking'
	}
}

export async function getStaticProps(context) {
	const slug = context.params.slug;
	const musicSearch = await (await fetch(`${process.env.BASE_URL}/api/music/${slug}`)).json();

	return {
		props: {
			music: musicSearch.music
		//	music: {
		//		id: id,
		//		title: "Basket Case",
		//		artist: "Green Day",
		//		album: "Dookie",
		//		author: "Trè Cool",
		//		tablature: {
		//			beats: 4,
		//			times: 4,
		//			beatsPerMin: 60,
		//			staff: [
		//				[0, 1, 0, 0, 0, 0, 0, 1],
		//				[0, 0, 0, 0, 0, 0, 0, 0],
		//				[0, 1, 0, 0, 0, 0, 0, 0],
		//				[0, 0, 0, 0, 0, 0, 0, 0],
		//				[0, 1, 0, 1, 0, 0, 0, 0],
		//				[0, 0, 0, 0, 0, 0, 0, 0],
		//				[0, 1, 0, 0, 0, 0, 0, 0],
		//				[0, 0, 0, 0, 0, 0, 0, 0],
		//				[0, 1, 0, 0, 0, 0, 0, 1],
		//				[0, 0, 0, 0, 0, 0, 0, 0],
		//				[0, 1, 0, 0, 0, 0, 0, 0],
		//				[0, 0, 0, 0, 0, 0, 0, 0],
		//				[0, 1, 0, 1, 0, 0, 0, 0],
		//				[0, 0, 0, 0, 0, 0, 0, 0],
		//				[0, 1, 0, 0, 0, 0, 0, 0],
		//				[0, 0, 0, 0, 0, 0, 0, 0],
		//				[0, 1, 0, 0, 0, 0, 0, 1],
		//				[0, 0, 0, 0, 0, 0, 0, 0],
		//				[0, 1, 0, 0, 0, 0, 0, 0],
		//				[0, 0, 0, 0, 0, 0, 0, 0],
		//				[0, 1, 0, 1, 0, 0, 0, 0],
		//				[0, 0, 0, 0, 0, 0, 0, 0],
		//				[0, 1, 0, 0, 0, 0, 0, 0],
		//				[0, 0, 0, 0, 0, 0, 0, 0],
		//				[0, 1, 0, 0, 0, 0, 0, 1],
		//				[0, 0, 0, 0, 0, 0, 0, 0],
		//				[0, 1, 0, 0, 0, 0, 0, 0],
		//				[0, 0, 0, 0, 0, 0, 0, 0],
		//				[0, 1, 0, 1, 0, 0, 0, 0],
		//				[0, 0, 0, 0, 0, 0, 0, 0],
		//				[0, 1, 0, 0, 0, 0, 0, 0],
		//				[0, 0, 0, 0, 0, 0, 0, 0],
		//				[0, 1, 0, 0, 0, 0, 0, 1],
		//				[0, 0, 0, 0, 0, 0, 0, 0],
		//				[0, 1, 0, 0, 0, 0, 0, 0],
		//				[0, 0, 0, 0, 0, 0, 0, 0],
		//				[0, 1, 0, 1, 0, 0, 0, 0],
		//				[0, 0, 0, 0, 0, 0, 0, 0],
		//				[0, 1, 0, 0, 0, 0, 0, 0],
		//				[0, 0, 0, 0, 0, 0, 0, 0],
		//				[0, 1, 0, 0, 0, 0, 0, 1],
		//				[0, 0, 0, 0, 0, 0, 0, 0],
		//				[0, 1, 0, 0, 0, 0, 0, 0],
		//				[0, 0, 0, 0, 0, 0, 0, 0],
		//				[0, 1, 0, 1, 0, 0, 0, 0],
		//				[0, 0, 0, 0, 0, 0, 0, 0],
		//				[0, 1, 0, 0, 0, 0, 0, 0],
		//				[0, 0, 0, 0, 0, 0, 0, 0],
		//				[0, 1, 0, 0, 0, 0, 0, 1],
		//				[0, 0, 0, 0, 0, 0, 0, 0],
		//				[0, 1, 0, 0, 0, 0, 0, 0],
		//				[0, 0, 0, 0, 0, 0, 0, 0],
		//				[0, 1, 0, 1, 0, 0, 0, 0],
		//				[0, 0, 0, 0, 0, 0, 0, 0],
		//				[0, 1, 0, 0, 0, 0, 0, 0],
		//				[0, 0, 0, 0, 0, 0, 0, 0],
		//				[0, 1, 0, 0, 0, 0, 0, 1],
		//				[0, 0, 0, 0, 0, 0, 0, 0],
		//				[0, 1, 0, 0, 0, 0, 0, 0],
		//				[0, 0, 0, 0, 0, 0, 0, 0],
		//				[0, 1, 0, 1, 0, 0, 0, 0],
		//				[0, 0, 0, 0, 0, 0, 0, 0],
		//				[0, 1, 0, 0, 0, 0, 0, 0],
		//				[0, 0, 0, 0, 0, 0, 0, 0],
		//				[0, 1, 0, 0, 0, 0, 0, 1],
		//				[0, 0, 0, 0, 0, 0, 0, 0],
		//				[0, 1, 0, 0, 0, 0, 0, 0],
		//				[0, 0, 0, 0, 0, 0, 0, 0],
		//				[0, 1, 0, 1, 0, 0, 0, 0],
		//				[0, 0, 0, 0, 0, 0, 0, 0],
		//				[0, 1, 0, 0, 0, 0, 0, 0],
		//				[0, 0, 0, 0, 0, 0, 0, 0],
		//				[0, 1, 0, 0, 0, 0, 0, 1],
		//				[0, 0, 0, 0, 0, 0, 0, 0],
		//				[0, 1, 0, 0, 0, 0, 0, 0],
		//				[0, 0, 0, 0, 0, 0, 0, 0],
		//				[0, 1, 0, 1, 0, 0, 0, 0],
		//				[0, 0, 0, 0, 0, 0, 0, 0],
		//				[0, 1, 0, 0, 0, 0, 0, 0],
		//				[0, 0, 0, 0, 0, 0, 0, 0],
		//			]
		//		},
		//		created_by: "Marcelo Mesquita",
		//		created_at: new Date().toISOString()
		//	}
		}
	}
}

function Music(props) {
	const pageTitle = props.music.title;
	const music = props.music;
	const drum = new Drum();
	const tablature = new Tablature(music.tablature);

	return (
		<Container>
			<Head>
				<title>{pageTitle} | {PROJECT.TITLE}</title>
			</Head>

			<div className="container is-widescreen">
				<section className="section is-clearfix">
					<Breadcrumb />

					<h1 className="title">{music.title}</h1>
					<h2 className="subtitle has-text-grey">{music.artist} {music.album && (`/ ${music.album}`)} {music.author && (`(${music.author})`)}</h2>

					<div className="tags">
						<span className="tag is-primary">double tap</span>
						<span className="tag is-primary">paradidle</span>
						<span className="tag is-primary">chops</span>
					</div>
				</section>
			</div>

			<div className="container is-fluid has-background-grey-lighter">
				<Drummer drum={drum} tablature={tablature} />
			</div>

			<div className="container is-widescreen">
				<section className="section">
					<p className="content is-small has-text-grey">Enviado por <a className="has-text-dark has-text-weight-bold">{music.created_by}</a> em {moment(music.created_at).format('DD\/MM\/YYYY')}</p>
				</section>
			</div>
		</Container>
	)
}

export default Music;
