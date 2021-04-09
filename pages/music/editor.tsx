import React from "react";
import Head from "next/head";
import { getSession } from "next-auth/client";
import Container from "../../components/layout/container"
import Drummer from "../../components/shared/drummer";
import Breadcrumb from "../../components/shared/breadcrumb";
import { Drum } from "../../models/drum";
import { Music } from "../../models/music";
import { PROJECT } from "../../project";
import { Session } from "next-auth";
import Slugify from "slugify";
import { Tablature } from "../../models/tablature";

interface MusicEditorProps {
	session: Session,
	music: Music
}

interface MusicEditorState {
	status: number,
	message: string,
	drum: Drum,
	music: Music
}

interface MusicEditorResponse {
	status: number,
	message: string,
	music: Music
}

export async function getServerSideProps(context) {
	const session = await getSession(context);
	const slug = "basket-case"; //context.body?.slug;
	var musicEditorResponse: MusicEditorResponse = null;

	if (slug) {
		musicEditorResponse = await (await fetch(`${process.env.BASE_URL}/api/music/${slug}`)).json();
	} else {
		musicEditorResponse = {
			status: 200,
			message: null,
			music: null
		}
	}

	if (session) {
		return {
			props: {
				session,
				status: musicEditorResponse.status,
				message: musicEditorResponse.message,
				music: musicEditorResponse.music
			}
		}
	} else {
		return {
			redirect: {
				destination: "/api/auth/signin",
				permanent: false,
			}
		}
	}
}

class MusicEditorPage extends React.Component<MusicEditorProps, MusicEditorState> {
	pageTitle: string = "Cadastrar Música";

	constructor(props: MusicEditorProps) {
		super(props);

		this.state = {
			status: 200,
			message: null,
			drum: new Drum(),
			music: new Music(props.music)
		}
	}

	setName = (value) => {
		this.state.music.name = value;

		this.setState(this.state);
	}

	setSlug = (value) => {
		this.state.music.slug = value;

		this.setState(this.state);
	}

	setArtist = (value) => {
		this.state.music.artist = value;

		this.setState(this.state);
	}

	setAlbum = (value) => {
		this.state.music.album = value;

		this.setState(this.state);
	}

	setAuthor = (value) => {
		this.state.music.author = value;

		this.setState(this.state);
	}

	setTablature = (tablature) => {
		this.state.music.tablature = tablature;

		this.setState(this.state);
	}

	setDefaultSlug = () => {
		if (!this.state.music.slug) {
			this.state.music.slug = Slugify(this.state.music.name, { lower: true });

			this.setState(this.state);
		}
	}

	handleSubmit = async (e) => {
		e.preventDefault();

		const res = await fetch("/api/music/insert", {
			body: JSON.stringify(this.state.music),
			headers: { "Content-Type": "application/json" },
			method: "POST"
		});

		if (res.status === 200) {
			let json: MusicEditorResponse = await res.json();
			let music: Music = new Music(json.music);

			this.setState({ music });
		} else {
			console.error(res);
		}
	}

	render() {
		let drum: Drum = this.state.drum;
		let music: Music = this.state.music;
		let tablature: Tablature = new Tablature(music.tablature);
		let pageTitle: string = music.name ? `Atualizar Música "${music.name}"` : this.pageTitle;

		return (
			<Container>
				<Head>
					<title>{pageTitle} | {PROJECT.TITLE}</title>
				</Head>

				<form onSubmit={this.handleSubmit}>
					<div className="container is-widescreen">
						<section className="section is-clearfix">
							<Breadcrumb />

							<h1 className="title">Nova Música</h1>

							<div className="field">
								<div className="control">
									<input
										className="input is-large"
										type="text"
										name="name"
										placeholder="Música"
										value={music.name}
										onChange={(e) => this.setName(e.target.value)}
										autoFocus />
								</div>
							</div>

							<div className="field">
								<div className="control">
									<input
										className="input is-small"
										type="text"
										placeholder="Slug"
										value={music.slug}
										onFocus={this.setDefaultSlug}
										onChange={(e) => this.setSlug(e.target.value)} />
								</div>
							</div>

							<div className="field is-horizontal">
								<div className="field-body">
									<div className="field">
										<div className="control">
											<input
												className="input"
												type="text"
												placeholder="Artista"
												value={music.artist.name}
												onChange={(e) => this.setArtist(e.target.value)} />
										</div>
									</div>
									<div className="field">
										<p className="control">
											<input
												className="input"
												type="text"
												placeholder="Álbum"
												value={music.album}
												onChange={(e) => this.setAlbum(e.target.value)} />
										</p>
									</div>
									<div className="field">
										<p className="control">
											<input
												className="input"
												type="text"
												placeholder="Batera"
												value={music.author}
												onChange={(e) => this.setAuthor(e.target.value)} />
										</p>
									</div>
								</div>
							</div>
						</section>
					</div>

					<div className="container is-fluid has-background-grey-lighter">
						<Drummer drum={drum} tablature={tablature} edit={true} onTablatureChange={this.setTablature} />
					</div>

					<div className="container is-widescreen">
						<section className="section">
							<button type="submit" className="button is-primary">Salvar</button>
						</section>
					</div>
				</form>
			</Container>
		)
	}
}

export default MusicEditorPage;
