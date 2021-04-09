import Head from "next/head";
import Link from "next/link";
import React from "react";
import Container from "../components/layout/container"
import { Artist } from "../models/artist";
import { Music } from "../models/music";
import { ArtistSearch } from "../models/search/artistSearch";
import { MusicSearch } from "../models/search/musicSearch";
import { PROJECT } from "../project";

interface HomeProps { }

interface HomeState {
	musics: Array<Music>;
	artists: Array<Artist>;
}

interface MusicResponse {
	status: number,
	message: string;
	musics: Array<Music>;
}

interface ArtistResponse {
	status: number,
	message: string;
	artists: Array<Artist>;
}

export async function getStaticProps(context) {
	const musicSearch: MusicSearch = {};
	const artistSearch: ArtistSearch = {};

	const musicResponse: MusicResponse = await (await fetch(`${process.env.BASE_URL}/api/music/search`, {
		body: JSON.stringify(musicSearch),
		headers: { "Content-Type": "application/json" },
		method: "POST"
	})).json();

	const artistResponse: ArtistResponse = await (await fetch(`${process.env.BASE_URL}/api/artist/search`, {
		body: JSON.stringify(artistSearch),
		headers: { "Content-Type": "application/json" },
		method: "POST"
	})).json();

	return {
		props: {
			musics: musicResponse.musics,
			artists: artistResponse.artists
		}
	}
}

class Home extends React.Component<HomeProps, HomeState> {
	pageTitle = "Home";

	constructor(props) {
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
									<h3 className="subtitle is-3 has-text-light">A forma mais simples de escrever e ler tablatura de baterias</h3>
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

export default Home;
