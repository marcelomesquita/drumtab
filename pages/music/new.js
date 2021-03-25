import Head from 'next/head';
import Container from 'layout/container'
import Drummer from 'components/drummer';
import { Tablature } from 'models/tablature';
import { Drum } from 'models/drum';
import Breadcrumb from 'components/breadcrumb';

function NewMusic(props) {
	var drum = new Drum();
	var tablature = new Tablature();

	tablature.addBar();

	return (
		<Container>
			<Head>
				<title>Nova Música | Drumtab</title>
			</Head>

			<div className="container is-widescreen">
				<section className="section is-clearfix">
					<Breadcrumb />

					<h1 className="title">Nova Música</h1>

					<div className="field">
						<div className="control">
							<input className="input is-large" type="text" placeholder="Música" />
						</div>
					</div>

					<div className="field">
						<div className="control">
							<input className="input" type="text" placeholder="Artista" />
						</div>
					</div>

					<div className="field is-horizontal">
						<div className="field-body">
							<div className="field">
								<p className="control">
									<input className="input" type="text" placeholder="Álbum" />
								</p>
							</div>
							<div className="field">
								<p className="control">
									<input className="input" type="text" placeholder="Batera" />
								</p>
							</div>
						</div>
					</div>
				</section>
			</div>

			<div className="container is-fluid has-background-grey-lighter">
				<Drummer drum={drum} tablature={tablature} />
			</div>

			<div className="container is-widescreen">
				<section className="section">
					<button className="button is-primary">Salvar</button>
				</section>
			</div>
		</Container>
	)
}

export default NewMusic;
