import Head from "next/head";
import Link from "next/link";
import Container from "../../components/layout/container"
import Breadcrumb from "../../components/shared/breadcrumb";
import Pagination from "../../components/shared/pagination";

export async function getStaticPaths() {
	return {
		paths: [],
		fallback: "blocking"
	}
}

export async function getStaticProps(context) {
	const musicsSearch = await (await fetch('http://localhost:3000/api/music/search')).json();

	return {
		props: {
			title: "Músicas",
			musics: musicsSearch.musics
		}
	}
}

function Musicas(props) {
	return (
		<Container>
			<Head>
				<title>{props.title} | Drumtab</title>
			</Head>

			<div className="container is-widescreen">
				<section className="section">
					<Breadcrumb />

					<h1 className="title">Músicas</h1>
					<h2 className="subtitle">Subtitle</h2>

					<div className="columns is-multiline">
						{props.musics.map((music) => { return (
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
													<p className="title is-5">{music.title}</p>
													<p className="subtitle is-6">{music.artist}</p>
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

export default Musicas;
