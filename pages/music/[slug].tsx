import React from "react";
import Head from "next/head";
import Link from "next/link";
import Error from "next/error";
import moment from "moment";
import Container from "../../components/layout/container"
import Breadcrumb from "../../components/shared/breadcrumb";
import Drummer from "../../components/shared/drummer";
import { Drum } from "../../models/drum";
import { PROJECT } from "../../project";
import { Music } from "../../models/music";
import { Tablature } from "../../models/tablature";

interface MusicProps {
	status: number;
	message: string;
	music: Music
}

interface MusicState {
	status: number;
	message: string;
	drum: Drum;
	music: Music;
}

interface MusicResponse {
	status: number;
	message: string;
	music: Music;
}

export async function getStaticPaths() {
	return {
		paths: [],
		fallback: "blocking"
	}
}

export async function getStaticProps(context) {
	const slug = context.params.slug;
	const response = await fetch(`${process.env.BASE_URL}/api/music/${slug}`);
	const musicResponse: MusicResponse = await response.json();

	return {
		props: {
			status: musicResponse.status,
			message: musicResponse.message,
			music: musicResponse.music
		}
	}
}

class MusicPage extends React.Component<MusicProps, MusicState> {
	constructor(props) {
		super(props);

		this.state = {
			status: props.status,
			message: props.message,
			drum: new Drum(),
			music: new Music(props.music)
		}
	}

	render() {
		let drum: Drum = this.state.drum;
		let music: Music = this.state.music;
		let tablature: Tablature = new Tablature(music.tablature);
		let pageTitle: string = music.name;

		if (this.state.status !== 200) return <Error statusCode={this.state.status} />;

		return (
			<Container>
				<Head>
					<title>{pageTitle} | {PROJECT.TITLE}</title>
				</Head>

				<div className="container is-widescreen">
					<section className="section is-clearfix">
						<Breadcrumb />

						<h1 className="title">{music.name}</h1>
						<h2 className="subtitle has-text-grey">{music.artist.name} {music.album && (`/ ${music.album}`)} {music.author && (`(${music.author})`)}</h2>

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

export default MusicPage;
