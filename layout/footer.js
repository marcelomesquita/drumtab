import Link from 'next/link';

function Footer() {
	return (
		<footer className="footer is-primary p-0">
			<div className="columns has-background-primary-light py-6 px-6">
				<div className="column">
					<h7 className="title is-7 has-text-primary-dark">MÚSICAS</h7>
					<ul>
						<li><Link href="/"><a className="has-text-primary">lançamentos</a></Link></li>
						<li><Link href="/"><a className="has-text-primary">mais acessadas</a></Link></li>
						<li><Link href="/"><a className="has-text-primary">artistas</a></Link></li>
					</ul>
				</div>
				<div className="column">
					<h7 className="title is-7 has-text-primary-dark">SAMPLES</h7>
					<ul>
						<li><Link href="/"><a className="has-text-primary">item 1</a></Link></li>
						<li><Link href="/"><a className="has-text-primary">item 2</a></Link></li>
						<li><Link href="/"><a className="has-text-primary">item 3</a></Link></li>
					</ul>
				</div>
				<div className="column">
					<h7 className="title is-7 has-text-primary-dark">BATERIAS</h7>
					<ul>
						<li><Link href="/"><a className="has-text-primary">item 1</a></Link></li>
						<li><Link href="/"><a className="has-text-primary">item 2</a></Link></li>
						<li><Link href="/"><a className="has-text-primary">item 3</a></Link></li>
					</ul>
				</div>
				<div className="column">
					<h7 className="title is-7 has-text-primary-dark">SOBRE</h7>
					<ul>
						<li><Link href="/"><a className="has-text-primary">ajuda</a></Link></li>
						<li><Link href="/"><a className="has-text-primary">quem somos</a></Link></li>
						<li><Link href="/"><a className="has-text-primary">termos de uso</a></Link></li>
					</ul>
				</div>
			</div>

			<div className="columns has-background-primary has-text-primary-dark py-2 px-6">
				<div className="column">
					<div className="content is-small has-text-left">
						<p>Drumtab by <a className="has-text-primary-light" href="https://marcelomesquita.com">Marcelo Mesquita</a></p>
					</div>
				</div>
				<div className="column">
					<div className="content is-small has-text-right">
						<p>version 1.0.0</p>
					</div>
				</div>
			</div>
		</footer>
	)
}

export default Footer;
