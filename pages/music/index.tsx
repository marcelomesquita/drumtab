import Head from "next/head";
import Link from "next/link";
import React from "react";
import Container from "../../components/layout/container"
import Breadcrumb from "../../components/shared/breadcrumb";
import Pagination from "../../components/shared/pagination";
import { Music } from "../../models/music";
import { MusicSearch } from "../../models/search/musicSearch";
import { PROJECT } from "../../project";

interface MusicsProps {
	music: Music
}

interface MusicsState {
	musics: Array<Music>;
}

interface MusicsResponse {
	message: string;
	musics: Array<Music>;
}

export async function getStaticProps(context) {
	const search: MusicSearch = {};

	const musicsResponse: MusicsResponse = await (await fetch(`${process.env.BASE_URL}/api/music/search`, {
		body: JSON.stringify(search),
		headers: { "Content-Type": "application/json" },
		method: "POST"
	})).json();

	return {
		props: {
			musics: musicsResponse.musics
		}
	}
}

class MusicsPage extends React.Component<MusicsProps, MusicsState> {
	pageTitle: string = "Músicas";

	constructor(props) {
		super(props);

		this.state = {
			musics: props.musics
		}
	}

	render() {
		let musics: Array<Music> = this.state.musics;

		return (
			<Container>
				<Head>
					<title>{this.pageTitle} | {PROJECT.TITLE}</title>
				</Head>

				<div className="container is-widescreen">
					<section className="section">
						<Breadcrumb />

						<h1 className="title">{this.pageTitle}</h1>
						<h2 className="subtitle">Não encontrou a música que queria? Que tal <Link href="/music/editor"><a>cadastrá-la!</a></Link></h2>

						<div className="columns is-multiline">
							{musics.map((music) => { return (
								<div key={music.slug} className="column is-4">
									<Link href={`/music/${music.slug}`}>
										<a>
											<div className="card">
												<div className="card-image">
													<figure className="image is-4by3">
														<img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image" />
													</figure>
												</div>
												<div className="card-content">
													<div className="content">
														<p className="title is-5">{music.name}</p>
														<p className="subtitle is-6">{music.artist.name}</p>
													</div>
												</div>
											</div>
										</a>
									</Link>
								</div>
							) })}
						</div>

						<Pagination />
					</section>
				</div>
			</Container>
		)
	}
}

export default MusicsPage;
