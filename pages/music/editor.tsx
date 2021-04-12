import React from "react";
import Head from "next/head";
import { Session } from "next-auth";
import { getSession } from "next-auth/client";
import Slugify from "slugify";
import { PROJECT } from "../../project";
import Container from "../../components/layout/container"
import Drummer from "../../components/shared/drummer";
import Breadcrumb from "../../components/shared/breadcrumb";
import Drum from "../../models/drum";
import Music from "../../models/music";
import Tablature from "../../models/tablature";
import MusicResponse from "../../interfaces/music-response"
import MusicService from "../../services/music-service";

interface Props {
	session: Session,
	music: Music
}

interface State {
	status: number,
	message: string,
	drum: Drum,
	music: Music,
	loading: boolean,
	validation: Object
}

export async function getServerSideProps(context) {
	const session = await getSession(context);
	const slug = context.body?.slug;
	var musicEditorResponse: MusicResponse = null;

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

export default class MusicEditorPage extends React.Component<Props, State> {
	pageTitle: string = "Cadastrar Música";
	musicService: MusicService = new MusicService();

	constructor(props: Props) {
		super(props);

		this.state = {
			status: 200,
			message: null,
			drum: new Drum(),
			music: new Music(props.music),
			loading: false,
			validation: {}
		}
	}

	setName = (e) => {
		(this.state.music.validateName(e.target.value)) ? e.target.classList.add("is-danger") : e.target.classList.remove("is-danger");

		this.state.music.name = e.target.value;
		this.setState({ music: this.state.music });
	}

	setSlug = async (e) => {
		if (this.state.music.validateSlug(e.target.value)) {
			e.target.classList.add("is-danger");
		} else {
			this.setState({ loading: true });

			this.musicService.exists(e.target.value)
				.then((exists) => exists ? e.target.classList.add("is-danger") : e.target.classList.remove("is-danger"))
				.catch((failure) => console.error(failure))
				.finally(() => this.setState({ loading: false }));
		}

		this.state.music.slug = e.target.value;
		this.setState({ music: this.state.music });
	}

	setArtist = (value) => {
		this.state.music.artist.name = value;
		this.setState({ music: this.state.music });
	}

	setAlbum = (value) => {
		this.state.music.album = value;
		this.setState({ music: this.state.music });
	}

	setAuthor = (value) => {
		this.state.music.author = value;
		this.setState({ music: this.state.music });
	}

	setTablature = (tablature) => {
		this.state.music.tablature = tablature;
		this.setState({ music: this.state.music });
	}

	setDefaultSlug = () => {
		if (this.state.music.name && !this.state.music.slug) {
			this.state.music.slug = Slugify(this.state.music.name, { lower: true });
			this.setState({ music: this.state.music });
		}
	}

	artistExists = async (slug, callback) => {
		this.setState({ loading: true });
		let response = await (await fetch(`/api/artist/${slug}/exists`)).json();
		this.setState({ loading: false });

		callback(response);
	}

	handleSubmit = async (e) => {
		e.preventDefault();

		const res = await fetch(`/api/music/insert`, {
			body: JSON.stringify(this.state.music),
			headers: { "Content-Type": "application/json" },
			method: "POST"
		});

		if (res.status === 200) {
			let json: MusicResponse = await res.json();
			console.log(json);
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
								<div className="control has-icons-left has-icons-right">
									<input
										className="input is-large"
										type="text"
										name="name"
										placeholder="Música"
										value={music.name}
										onChange={(e) => this.setName(e)}
										autoFocus />
									<span className="icon is-small is-left">
										<i className="fw fas fa-music"></i>
									</span>
								</div>
								{music.validateName() && (<p className="help">{music.validateName()}</p>)}
							</div>

							<div className="field">
								<div className={`control has-icons-left has-icons-right is-small ${this.state.loading ? "is-loading" : ""}`}>
									<input
										className="input is-small"
										type="text"
										placeholder="Slug"
										value={music.slug}
										onFocus={this.setDefaultSlug}
										onChange={(e) => this.setSlug(e)} />
									<span className="icon is-small is-left">
										<i className="fw fas fa-link"></i>
									</span>
								</div>
								{this.state.loading}
								{music.validateSlug() && (<p className="help">{music.validateSlug()}</p>)}
							</div>

							<div className="field is-horizontal">
								<div className="field-body">
									<div className="field">
										<div className="control has-icons-left has-icons-right">
											<input
												className="input"
												type="text"
												placeholder="Artista"
												value={music.artist.name}
												onChange={(e) => this.setArtist(e.target.value)} />
											<span className="icon is-small is-left">
												<i className="fw fas fa-users"></i>
											</span>
										</div>
										{music.validateName() && (<p className="help">{music.validateName()}</p>)}
									</div>
									<div className="field">
										<div className="control has-icons-left has-icons-right">
											<input
												className="input"
												type="text"
												placeholder="Álbum"
												value={music.album}
												onChange={(e) => this.setAlbum(e.target.value)} />
											<span className="icon is-small is-left">
												<i className="fw fas fa-record-vinyl"></i>
											</span>
										</div>
									</div>
									<div className="field">
										<div className="control has-icons-left has-icons-right">
											<input
												className="input"
												type="text"
												placeholder="Batera"
												value={music.author}
												onChange={(e) => this.setAuthor(e.target.value)} />
											<span className="icon is-small is-left">
												<i className="fw fas fa-user"></i>
											</span>
										</div>
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
							<button type="submit" className="button is-primary" disabled={!music.isValid()}>Salvar</button>
						</section>
					</div>
				</form>
			</Container>
		)
	}
}
