import Head from "next/head";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Container from '../layout/container'
import Link from "next/link";

function Home() {
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
								<button className="button is-success is-large">Entre nesse clube</button>
							</div>
							<div className="column">
								<iframe width="560" height="315" src="https://www.youtube.com/embed/doIDjVS7qEM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
							</div>
						</div>
					</div>
				</div>
			</section>

			<div className="container is-widescreen">
				<section className="section">
					<div className="columns">
						<div className="column is-two-thirds">
							<a className="is-pulled-right has-text-primary">ver todas as músicas <FontAwesomeIcon icon={faChevronRight} /></a>
							<h1 className="title is-4 is-info">MÚSICAS POPULARES</h1>
							<Link href="/">
								<a className="has-text-primary">
									<div className="box is-shadowless">
										<span>1</span>
										<p>Basket Case</p>
										<p>Green Day</p>
									</div>
								</a>
							</Link>
							<Link href="/">
								<a className="has-text-primary">
									<div className="box is-shadowless">
										<span>2</span>
										<p>Duality</p>
										<p>Slipknot</p>
									</div>
								</a>
							</Link>
							<Link href="/">
								<a className="has-text-primary">
									<div className="box is-shadowless">
										<span>3</span>
										<p>Be Yourself</p>
										<p>Audioslave</p>
									</div>
								</a>
							</Link>
						</div>
						<div className="column">
							<a className="is-pulled-right has-text-primary">ver todas os artistas <FontAwesomeIcon icon={faChevronRight} /></a>
							<h1 className="title is-4 is-info">ARTISTAS</h1>
							<div className="box is-shadowless"><Link href="/"><a className="has-text-primary">Green Day</a></Link></div>
							<div className="box is-shadowless"><Link href="/"><a className="has-text-primary">Audioslave</a></Link></div>
							<div className="box is-shadowless"><Link href="/"><a className="has-text-primary">Slipknot</a></Link></div>
							<div className="box is-shadowless"><Link href="/"><a className="has-text-primary">30 Seconds to Mars</a></Link></div>
						</div>
					</div>
				</section>
			</div>
		</Container>
	)
}

export default Home;
