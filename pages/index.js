import Head from "next/head";
import Container from '../layout/container'

function Home() {
	return (
		<Container>
			<Head>
				<title>Home | Drumtab</title>
			</Head>

			<section className="section">
				<h1>Titulo</h1>
			</section>
		</Container>
	)
}

export default Home;
