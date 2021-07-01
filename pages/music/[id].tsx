import Head from "next/head";
import Link from 'next/link';
import moment from "moment";
import Container from "components/layout/Container"
import Breadcrumb from "components/shared/Breadcrumb";
import Drummer from "components/shared/Drummer";
import Drum from "models/Drum";
import Music from "models/Music";
import Tablature from "models/Tablature";
import MusicRepository from "repository/MusicRepository";

export async function getStaticPaths() {
	return {
		paths: [],
		fallback: "blocking"
	}
}

export async function getStaticProps(context) {
	const music = await MusicRepository.load(context.params.id);

	return {
		props: {
			music
		}
	}
}

export default function MusicPage(props) {
	const drum: Drum = new Drum();
	const music: Music = new Music(props.music);
	const tablature: Tablature = new Tablature(music.tablature);
	const pageTitle: string = music.name;

	return (
		<Container>
			<Head>
				<title>{pageTitle} | {process.env.NEXT_PUBLIC_TITLE}</title>
			</Head>

			<div className="container is-widescreen">
				<section className="section is-clearfix">
					<Breadcrumb />

					<Link href={`/music/editor/?id=${music.id}`}>
						<a className="button is-outlined is-small is-align-content-end">editar</a>
					</Link>

					<h1 className="title">{music.name}</h1>
					<h2 className="subtitle has-text-grey">{music.artist.name} {music.album?.name && (`/ ${music.album.name}`)} {music.author?.name && (`(${music.author.name})`)}</h2>

					<div className="tags">
						<span className="tag is-primary">double tap</span>
						<span className="tag is-primary">paradidle</span>
						<span className="tag is-primary">chops</span>
					</div>
				</section>
			</div>

			<div className="container is-fluid has-background-grey-lighter">
				<Drummer drum={drum} tablature={tablature} edit={false} />
			</div>

			<div className="container is-widescreen">
				<section className="section">
					<p className="content is-small has-text-grey">Enviado por <a className="has-text-dark has-text-weight-bold">{music.createdBy?.name}</a> em {moment(music.createdAt).format('DD/MM/YYYY')}</p>
				</section>
			</div>
		</Container>
	)
}
