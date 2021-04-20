import React from "react";
import Head from "next/head";
import Error from "next/error";
import moment from "moment";
import { PROJECT } from "../../project";
import Container from "../../components/layout/container"
import Breadcrumb from "../../components/shared/breadcrumb";
import Drummer from "../../components/shared/drummer";
import Drum from "../../models/drum";
import Music from "../../models/music";
import Tablature from "../../models/tablature";
import MusicService from "../../services/music-service";

interface Props {
	status: number,
	music: Music;
}

interface State {
	status: number,
	drum: Drum;
	music: Music;
}

export async function getStaticPaths() {
	return {
		paths: [],
		fallback: true
	}
}

export async function getStaticProps(context) {
	const musicService = new MusicService();
	const slug = context.params.slug;
	let music: Music = null;
	let status: number = 200;

	await musicService.select(slug)
		.then((success) => music = success)
		.catch((failure) => status = failure);

	return {
		props: {
			music,
			status
		}
	}
}

export default class MusicPage extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);

		this.state = {
			status: props.status,
			drum: new Drum(),
			music: new Music(props.music)
		}
	}

	render() {
		let drum: Drum = this.state.drum;
		let music: Music = this.state.music;
		let tablature: Tablature = new Tablature(music.tablature);
		let pageTitle: string = music.name;

		if (this.state.status != 200) return <Error statusCode={this.state.status} />;

		return (
			<Container>
				<Head>
					<title>{pageTitle} | {PROJECT.TITLE}</title>
				</Head>

				<div className="container is-widescreen">
					<section className="section is-clearfix">
						<Breadcrumb />

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
						<p className="content is-small has-text-grey">Enviado por <a className="has-text-dark has-text-weight-bold">{music.createdBy.name}</a> em {moment(music.createdAt).format("DD\/MM\/YYYY")}</p>
					</section>
				</div>
			</Container>
		)
	}
}
