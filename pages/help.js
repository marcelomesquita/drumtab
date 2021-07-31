import Head from 'next/head';
import Container from '../components/layout/Container';

export default function HelpPage(props) {
	const pageTitle = 'Ajuda';

	return (
		<Container>
			<Head>
				<title>{pageTitle} | {process.env.NEXT_PUBLIC_TITLE}</title>
				<meta property="description" content="Precisa de ajuda para usar o drumtab?" key="description" />
			</Head>

			<div className='container is-widescreen'>
				<section className='section'>
					<div className='content'>
					<h1 className='title is-1'>{pageTitle}</h1>
						<h3>1. É grátis?</h3>
						<p>Sim</p>
						<h3>2. Como faço para cadastrar tablaturas de bateria?</h3>
						<p>Basta se inscrever.</p>
						<h3>3. Como faço para montar uma bateria?</h3>
						<p>Ainda estamos desenvolvendo essa funcionalidade.</p>
					</div>
				</section>
			</div>
		</Container>
	);
}
