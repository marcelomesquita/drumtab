import Head from "next/head";
import Link from "next/link";
import Container from "../../layout/container"
import Breadcrumb from "../../components/breadcrumb";
import Pagination from "../../components/pagination";

export async function getStaticPaths() {
	return {
		paths: [],
		fallback: "blocking"
	}
}

export async function getStaticProps(context) {
	return {
		props: {
			title: "Músicas",
			musics: [
				{
					id: 1,
					title: "Basket Case",
					artist: "Green Day"
				},
				{
					id: 2,
					title: "Be yourself",
					artist: "Audioslave"
				},
				{
					id: 3,
					title: "Duality",
					artist: "Slipknot"
				},
				{
					id: 4,
					title: "30 Seconds to Mars",
					artist: "Walk on Water"
				},
			]
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
							<div key={music.id} className="column is-4">
								<Link href="/music/1">
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
