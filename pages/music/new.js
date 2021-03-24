import Head from 'next/head';
import Link from 'next/link';
import Container from 'layout/container'
import Breadcrumb from 'components/breadcrumb';
import Drummer from 'components/drummer';
import { Tablature } from 'models/tablature';
import { Drum } from 'models/drum';

function NewMusic(props) {
	var drum = new Drum();
	var tablature = new Tablature();

	tablature.addBar();

	return (
		<Container>
			<Head>
				<title>Nova Música | Drumtab</title>
			</Head>

			<section className="section is-clearfix">
				<Breadcrumb />
				
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

				<Drummer drum={drum} tablature={tablature} />

				<hr />

				<div className="field">
					<div className="control">
						<button className="button is-link">Salvar</button>
					</div>
				</div>
			</section>
		</Container>
	)
}

export default NewMusic;
