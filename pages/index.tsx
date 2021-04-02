import Head from "next/head";
import Link from "next/link";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Container from "../layout/container"

export async function getStaticPaths() {
	return {
		paths: [],
		fallback: 'blocking'
	}
}

export async function getStaticProps(context) {
	return {
		props: {
			musics: [
				{
					id: 1,
					title: "Basket Case",
					artist: "Green Day",
					album: "Dookie",
					author: "Trè Cool"
				},
				{
					id: 1,
					title: "Be Yourself",
					artist: "Audioslave",
					album: "Dookie",
					author: "Trè Cool"
				},
				{
					id: 1,
					title: "Duality",
					artist: "Slipknot",
					album: "Dookie",
					author: "Trè Cool"
				},
				{
					id: 1,
					title: "Nothin Else Matters",
					artist: "Metalica",
					album: "The Black Album",
					author: "Trè Cool"
				},
				{
					id: 1,
					title: "30 Seconds to Mars",
					artist: "Walk On Water",
					album: "Dookie",
					author: "Trè Cool"
				},
				{
					id: 1,
					title: "Basket Case",
					artist: "Green Day",
					album: "Dookie",
					author: "Trè Cool"
				}
			],
			artists: [
				{
					id: 1,
					title: "Audioslave",
					image: "https://bulma.io/images/placeholders/128x128.png"
				},
				{
					id: 2,
					title: "Green Day",
					image: "https://bulma.io/images/placeholders/128x128.png"
				},
				{
					id: 3,
					title: "Slipknot",
					image: "https://bulma.io/images/placeholders/128x128.png"
				}
			]
		}
	}
}

function Home(props) {
	return (
		<Container>
			<Head>
				<title>Home | Drumtab</title>
			</Head>

			<section className="hero is-link is-medium">
				<div className="hero-body">
					<div className="container is-widescreen">
						<div className="columns">
							<div className="column">
								<h2 className="title is-2">DrumTab</h2>
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
						<Link href="/music"><a className="is-pulled-right has-text-primary">ver todas as músicas <FontAwesomeIcon icon={faChevronRight} /></a></Link>
							<h2 className="title is-4 is-info">MÚSICAS POPULARES</h2>
							<div className="columns">
								<div className="column">
									{props.musics.filter((music, m) => (m < 5)).map((music, m) => { return (
										<Link key={`music-${m}`} href={`/music/${music.id}`}>
											<a className="has-text-primary">
												<div className="box is-shadowless">
													<span className="title is-1 is-pulled-left has-text-grey-light mr-2">{m + 1}</span>
													<h3 className="title is-5 mt-2 mb-0">{music.title}</h3>
													<h4 className="title is-6 has-text-grey">{music.artist}</h4>
												</div>
											</a>
										</Link>
									)})}
								</div>
								<div className="column">
									{props.musics.filter((music, m) => (m >= 5)).map((music, m) => { return (
										<Link key={`music-${m}`} href={`/music/${music.id}`}>
											<a className="has-text-primary">
												<div className="box is-shadowless">
													<span className="title is-1 is-pulled-left has-text-grey-light mr-2">{m + 1 + 5}</span>
													<h3 className="title is-5 mt-2 mb-0">{music.title}</h3>
													<h4 className="title is-6 has-text-grey">{music.artist}</h4>
												</div>
											</a>
										</Link>
									)})}
								</div>
							</div>
						</div>
						<div className="column">
							<Link href="/music"><a className="is-pulled-right has-text-primary">ver todas os artistas <FontAwesomeIcon icon={faChevronRight} /></a></Link>
							<h1 className="title is-4 is-info">ARTISTAS</h1>
							{props.artists.map((artist, a) => { return (
								<Link key={`artist-${a}`} href="/music">
									<a className="has-text-primary">
										<div className="box is-shadowless">
											<div className="is-pulled-left mr-3">
												<figure className="image is-48x48">
													<img className="is-rounded" src={artist.image} />
												</figure>
											</div>
											<h3 className="title is-5 mt-3">{artist.title}</h3>
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

export default Home;
