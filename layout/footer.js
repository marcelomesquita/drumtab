import Link from 'next/link';

function Footer() {
	return (
		<footer className="footer has-background-light">
			<div className="container is-widescreen">
				<section className="section">
					<div className="columns">
						<div className="column is-one-third">
							<h2 className="title is-2">DrumTab</h2>
							<ul className="content is-small is-text-grey">
								<li>Marcelo Mesquita</li>
								<li>1.0.0</li>
							</ul>
						</div>
						<div className="column">
							<h6 className="title is-7 has-text-primary-dark">MÚSICAS</h6>
							<ul className="content">
								<li><Link href="/"><a className="has-text-primary">lançamentos</a></Link></li>
								<li><Link href="/"><a className="has-text-primary">populares</a></Link></li>
								<li><Link href="/"><a className="has-text-primary">artistas</a></Link></li>
								<li><Link href="/"><a className="has-text-primary">álbuns</a></Link></li>
							</ul>
							<h6 className="title is-7 has-text-primary-dark">SAMPLES</h6>
							<ul className="content">
								<li><Link href="/"><a className="has-text-primary">lançamentos</a></Link></li>
								<li><Link href="/"><a className="has-text-primary">populares</a></Link></li>
							</ul>
						</div>
						<div className="column">
							<h6 className="title is-7 has-text-primary-dark">PARTICIPE</h6>
							<ul className="content">
								<li><Link href="/"><a className="has-text-primary">cadastre músicas</a></Link></li>
								<li><Link href="/"><a className="has-text-primary">cadastre samples</a></Link></li>
								<li><Link href="/"><a className="has-text-primary">monte sua bateria</a></Link></li>
							</ul>
						</div>
						<div className="column">
							<h6 className="title is-7 has-text-primary-dark">SOBRE</h6>
							<ul className="content">
								<li><Link href="/"><a className="has-text-primary">ajuda</a></Link></li>
								<li><Link href="/"><a className="has-text-primary">quem somos</a></Link></li>
								<li><Link href="/"><a className="has-text-primary">termos de uso</a></Link></li>
							</ul>
						</div>
					</div>
				</section>
			</div>
		</footer>
	)
}

export default Footer;
