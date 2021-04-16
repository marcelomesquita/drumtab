import Head from "next/head";
import Link from "next/link";
import React from "react";
import { PROJECT } from "../project";
import Container from "../components/layout/container"
import ArtistResponse from "../interfaces/artists-response";
import Artist from "../models/artist";
import Music from "../models/music";
import ArtistSearch from "../models/search/artist-search";
import MusicSearch from "../models/search/music-search";
import MusicService from "../services/music-service";
import ArtistService from "../services/artist-service";

interface Props {
	musics: Array<Music>;
	artists: Array<Artist>;
}

interface State {
	musics: Array<Music>;
	artists: Array<Artist>;
}

export async function getStaticProps(context) {
	const musicService = new MusicService();
	const artistService = new ArtistService();
	const musicSearch: MusicSearch = {};
	const artistSearch: ArtistSearch = {};
	let musics: Array<Music> = [];
	let artists: Array<Artist> = [];

	await musicService.search(musicSearch).then((success) => musics = success);
	await artistService.search(artistSearch).then((success) => artists = success);

	return {
		props: {
			musics,
			artists
		}
	}
}

export default class Home extends React.Component<Props, State> {
	pageTitle = "Home";

	constructor(props: Props) {
		super(props);

		this.state = {
			artists: props.artists,
			musics: props.musics
		}
	}

	render() {
		let musics = this.state.musics;
		let artists = this.state.artists;

		return (
			<Container>
				<Head>
					<title>{this.pageTitle} | {PROJECT.TITLE}</title>
				</Head>

				<section className="hero is-link is-medium">
					<div className="hero-body">
						<div className="container is-widescreen">
							<div className="columns">
								<div className="column">
									<h2 className="title is-2">{PROJECT.TITLE}</h2>
									<h3 className="subtitle is-3 has-text-light">{PROJECT.DESCRIPTION}</h3>
								</div>
								<div className="column">
								<figure className="image is-4by3">
									<img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image" />
								</figure>
								</div>
							</div>
						</div>
					</div>
				</section>

				<div className="container is-widescreen">
					<section className="section">
						<div className="columns">
							<div className="column is-two-thirds">
								<div className="level">
									<div className="level-left">
										<h2 className="title is-4 is-info">MÚSICAS POPULARES</h2>
									</div>
									<div className="level-right">
										<Link href="/music">
											<a className="is-pulled-right has-text-primary">
												ver todas as músicas
												<span className="icon is-small"><i className="fw fas fa-chevron-right" /></span>
											</a>
										</Link>
									</div>
								</div>
								<div className="columns">
									<div className="column">
										{musics.filter((music, m) => (m < 5)).map((music, m) => { return (
											<Link key={`music-${m}`} href={`/music/${music.slug}`}>
												<a className="has-text-primary">
													<div className="box is-shadowless">
														<span className="title is-1 is-pulled-left has-text-grey-light mr-2">{m + 1}</span>
														<h3 className="title is-5 mt-2 mb-0">{music.name}</h3>
														<h4 className="title is-6 has-text-grey">{music.artist.name}</h4>
													</div>
												</a>
											</Link>
										)})}
									</div>
									<div className="column">
										{musics.filter((music, m) => (m >= 5)).map((music, m) => { return (
											<Link key={`music-${m}`} href={`/music/${music.slug}`}>
												<a className="has-text-primary">
													<div className="box is-shadowless">
														<span className="title is-1 is-pulled-left has-text-grey-light mr-2">{m + 1 + 5}</span>
														<h3 className="title is-5 mt-2 mb-0">{music.name}</h3>
														<h4 className="title is-6 has-text-grey">{music.artist.name}</h4>
													</div>
												</a>
											</Link>
										)})}
									</div>
								</div>
							</div>
							<div className="column">
								<Link href="/music">
									<a className="is-pulled-right has-text-primary">
										ver todas os artistas
										<span className="icon is-small"><i className="fw fas fa-chevron-right" /></span>
									</a>
								</Link>
								<h1 className="title is-4 is-info">ARTISTAS</h1>
								{artists.map((artist, a) => { return (
									<Link key={`artist-${a}`} href="/music">
										<a className="has-text-primary">
											<div className="box is-shadowless">
												<div className="is-pulled-left mr-3">
													<figure className="image is-48x48">
														<img className="is-rounded" src="" />
													</figure>
												</div>
												<h3 className="title is-5 mt-3">{artist.name}</h3>
											</div>
										</a>
									</Link>
								)})}
							</div>
						</div>
					</section>
				</div>
			</Container>
		)
	}
}
