import React from "react";
import Head from "next/head";
import moment from "moment";
import { PROJECT } from "../../project";
import Container from "../../components/layout/container"
import Breadcrumb from "../../components/shared/breadcrumb";
import Drummer from "../../components/shared/drummer";
import Drum from "../../models/drum";
import Music from "../../models/music";
import MusicService from "../../services/music-service";

export async function getStaticPaths() {
	return {
		paths: [],
		fallback: "blocking"
	}
}

export async function getStaticProps(context) {
	const musicService = new MusicService();
	const slug = context.params.slug;
	const music: Music = await musicService.select(slug);

	return {
		props: {
			music
		}
	}
}

export default function MusicPage(props) {
	const drum: Drum = new Drum();
	const music: Music = new Music(props.music);
	const pageTitle: string = music.name;

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
				<Drummer drum={drum} tablature={music.tablature} edit={false} />
			</div>

			<div className="container is-widescreen">
				<section className="section">
					<p className="content is-small has-text-grey">Enviado por <a className="has-text-dark has-text-weight-bold">{music.createdBy.name}</a> em {moment(music.createdAt).format("DD\/MM\/YYYY")}</p>
				</section>
			</div>
		</Container>
	)
}
