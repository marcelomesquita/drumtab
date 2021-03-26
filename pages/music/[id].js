import Head from 'next/head';
import Link from 'next/link';
import Container from 'layout/container'
import Breadcrumb from 'components/breadcrumb';
import Drummer from 'components/drummer';
import { Tablature } from 'models/tablature';
import { Drum } from 'models/drum';
import moment from 'moment';

export async function getStaticPaths() {
	return {
		paths: [],
		fallback: 'blocking'
	}
}

export async function getStaticProps(context) {
	const id = context.params.id;
	const today = new Date();

	return {
		props: {
			id: id,
			title: "Basket Case",
			artist: "Green Day",
			album: "Dookie",
			author: "Trè Cool",
			tablature: {
				beats: 4,
				times: 4,
				beatsPerMin: 60,
				staff: [
					[0, 1, 0, 1, 0, 0, 0, 0],
					[0, 0, 0, 2, 0, 0, 0, 0],
					[0, 0, 0, 3, 0, 0, 0, 0],
					[0, 0, 0, 4, 0, 0, 0, 0],
					[0, 1, 0, 5, 0, 0, 0, 0],
					[0, 0, 0, 0, 0, 0, 0, 0],
					[0, 0, 0, 0, 0, 0, 0, 0],
					[0, 0, 0, 0, 0, 0, 0, 0],
					[0, 0, 1, 0, 0, 0, 0, 0],
					[0, 0, 0, 0, 0, 0, 0, 0],
					[0, 0, 0, 0, 0, 0, 0, 0],
					[0, 0, 0, 0, 0, 0, 0, 0],
					[0, 0, 0, 0, 0, 0, 0, 1],
					[0, 0, 0, 0, 0, 0, 0, 0],
					[0, 0, 0, 0, 0, 0, 0, 0],
					[0, 0, 0, 0, 0, 0, 0, 0]
				]
			},
			created_by: "Marcelo Mesquita",
			created_at: today.toISOString()
		}
	}
}

function Music(props) {
	var drum = new Drum();
	var tablature = new Tablature(props.tablature);

	function getAlbum() {
		return props.album ? `/ ${props.album}` : ``;
	}

	function getAuthor() {
		return props.author ? `(${props.author})` : ``;
	}

	return (
		<Container>
			<Head>
				<title>{props.title} | Drumtab</title>
			</Head>

			<div className="container is-widescreen">
				<section className="section is-clearfix">
					<Breadcrumb />

					<h1 className="title">{props.title}</h1>
					<h2 className="subtitle has-text-grey">{props.artist} {getAlbum()} {getAuthor()}</h2>

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
					<p className="content is-small has-text-grey">Enviado por <a className="has-text-dark has-text-weight-bold">{props.created_by}</a> em {moment(props.created_at).format('DD\/MM\/YYYY')}</p>
				</section>
			</div>
		</Container>
	)
}

export default Music;
