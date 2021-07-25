import Head from 'next/head';
import Container from '../components/layout/Container';

export default function AboutPage(props) {
	const pageTitle = 'Sobre';

	return (
		<Container>
			<Head>
				<title>{pageTitle} | {process.env.NEXT_PUBLIC_TITLE}</title>
			</Head>

			<div className='container is-widescreen'>
				<section className='section'>
					<div className='content'>
						<h1>Sobre</h1>
						<p>Já tentou entender como era aquela virada embaçada que um batera faz naquela música que você acha do caralho?</p>
						<p>Já ficou frustrado por não conseguir acompanhar a bateria porque a música é muito rápida?</p>
						<p>Já deixou uma batida fodástica se perder no tempo porque não a registrou enquanto ainda estava fresca em sua memória?</p>
						<p>Te entendemos! Por isso criamos esse site.</p>
						<p>Drumtab é um site colaborativo de baterias que queiram aprender e contribuir. Aqui você pode entender como tocar aquela música que adora, acompanhar a música na velocidade que você aguenta e registrar o melhor sample do mundo para nunca mais esquece-lo.</p>
						<p>Um programador que adora tocar bateria.</p>
					</div>
				</section>
			</div>
		</Container>
	);
}
