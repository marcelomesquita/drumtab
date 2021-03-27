import Link from 'next/link';
import React from 'react';

class Footer extends React.Component {
	constructor(props) {
		super(props);
	}

	menu = () => {
		if (this.props.menu) {
			return (
				<section className="section">
					<div className="columns">
						<div className="column is-one-third">
							<h2 className="title is-2">DrumTab</h2>
						</div>
						<div className="column">
							<h6 className="title is-7 has-text-primary-dark">MÚSICAS</h6>
							<ul className="content">
								<li><Link href="/"><a className="has-text-primary">lançamentos</a></Link></li>
								<li><Link href="/"><a className="has-text-primary">populares</a></Link></li>
								<li><Link href="/"><a className="has-text-primary">artistas</a></Link></li>
								<li><Link href="/"><a className="has-text-primary">álbuns</a></Link></li>
							</ul>
						</div>
						<div className="column">
							<h6 className="title is-7 has-text-primary-dark">PARTICIPE</h6>
							<ul className="content">
								<li><Link href="/"><a className="has-text-primary">cadastre músicas</a></Link></li>
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
			)
		}
	}

	render() {
		return (
			<footer className="footer has-background-light pb-0">
				<div className="container is-widescreen">
					{this.menu()}

					<section className="section">
						<div className="columns">
							<div className="column">
								<div className="content is-small has-text-grey">
									<p>&copy; DrumTab by <a href="https://marcelomesquita.com" target="_blank" className="has-text-primary">Marcelo Mesquita</a></p>
								</div>
							</div>
							<div className="column">
								<div className="content is-small has-text-grey has-text-right">
									<p>1.0.0</p>
								</div>
							</div>
						</div>
					</section>
				</div>
			</footer>
		)
	}
}

export default Footer;
