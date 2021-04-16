import React from "react";
import Head from "next/head";
import { Session } from "next-auth";
import { getSession } from "next-auth/client";
import Slugify from "slugify";
import { PROJECT } from "../../project";
import Container from "../../components/layout/container"
import Drummer from "../../components/shared/drummer";
import Breadcrumb from "../../components/shared/breadcrumb";
import Notification from "../../components/shared/notification";
import Drum from "../../models/drum";
import Music from "../../models/music";
import Tablature from "../../models/tablature";
import MusicResponse from "../../interfaces/music-response"
import MusicService from "../../services/music-service";
import ArtistService from "../../services/artist-service";
import AsyncSelect from 'react-select/async';
import { ObjectId } from "bson";
import Modal from "../../components/shared/modal";

interface Props {
	session: Session,
	music: Music
}

interface State {
	status: number,
	drum: Drum,
	music: Music,
	message: string,
	messageSlug: string,
	messageArtist: string,
	loading: boolean,
	loadingSlug: boolean,
	loadingArtist: boolean,
	createArtist: boolean,
	modalArtist: boolean,
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
	artistService: ArtistService = new ArtistService();

	constructor(props: Props) {
		super(props);

		this.state = {
			status: 200,
			drum: new Drum(),
			music: new Music(props.music),
			message: null,
			messageSlug: null,
			messageArtist: null,
			loading: false,
			loadingSlug: false,
			loadingArtist: false,
			createArtist: false,
			modalArtist: false,
		}
	}

	setName = (name) => {
		this.state.music.name = name;
		this.setState({ music: this.state.music });
	}

	setSlug = async (slug) => {
		let message = this.state.music.validateSlug(slug);

		if (message) {
			this.setState({ messageSlug: message });
		} else {
			this.setState({ loadingSlug: true });

			this.musicService.exists(slug)
				.then((exists) => {
					if (exists) {
						this.setState({ messageSlug: "slug already exists!" });
					} else {
						this.setState({ messageSlug: null });
					}
				})
				.catch((failure) => this.setState({ message: failure }))
				.finally(() => this.setState({ loadingSlug: false }));
		}

		this.state.music.slug = slug;
		this.setState({ music: this.state.music });
	}

	setArtist = (artist) => {
		let message = this.state.music.validateArtist(artist.data.name);

		if (message) {
			this.setState({ messageArtist: message });
		}

		this.state.music.artist = artist.data;
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
			this.setSlug(Slugify(this.state.music.name, { lower: true }));
		}
	}

	searchArtists = (value, callback) => {
		if (value.length < 3) {
			callback();
		} else {
//			this.artistService.search({ name: value })
//				.then((artists) => {
//					let options = [];
//
//					artists.map((artist) => {
//						options.push({
//							label: artist.name,
//							value: artist.name,
//							data: artist
//						});
//					});
//
//					callback(options);
//				})
//				.catch((failure) => {
//					this.setState({ createArtist: true })
//					callback();
//				});
		}
	}

	handleSubmit = async (e) => {
		e.preventDefault();

		this.setState({ loading: true });

		this.musicService.insert(this.state.music)
			.then((music) => this.setState({ music: new Music(music) }))
			.catch((failure) => this.setState({ message: failure.message }))
			.finally(() => this.setState({ loading: false }));
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

				{this.state.message && (<Notification onClose={() => this.setState({ message: null })}>{this.state.message}</Notification>)}

				{this.state.modalArtist && (<Modal title="Artist" onClose={() => this.setState({ modalArtist: false })}>Lorem ipsum dolor</Modal>)}

				<form onSubmit={this.handleSubmit}>
					<div className="container is-widescreen">
						<section className="section is-clearfix">
							<Breadcrumb />

							<h1 className="title">Nova Música</h1>

							<div className="field">
								<label className="label">Música *</label>
								<div className="control has-icons-left has-icons-right">
									<input
										className="input is-large"
										type="text"
										name="name"
										placeholder="Música"
										value={music.name}
										onChange={(e) => this.setName(e.target.value)}
										autoFocus />
									<span className="icon is-small is-left">
										<i className="fw fas fa-music"></i>
									</span>
								</div>
							</div>

							<div className="field">
								<div className={`control has-icons-left has-icons-right is-small ${this.state.loadingSlug ? "is-loading" : ""}`}>
									<input
										className="input is-small"
										type="text"
										placeholder="Slug"
										value={music.slug}
										onFocus={this.setDefaultSlug}
										onChange={(e) => this.setSlug(e.target.value)} />
									<span className="icon is-small is-left">
										<i className="fw fas fa-link"></i>
									</span>
								</div>
								{this.state.messageSlug && (<p className="help">{this.state.messageSlug}</p>)}
							</div>

							<div className="columns">
								<div className="column is-4">
									<div className="field">
										<label className="label">Artista *</label>
										<div className="control">
											<AsyncSelect
												placeholder="Artist"
												instanceId="artist"
												loadOptions={this.searchArtists}
												onChange={(e) => this.setArtist(e)} />
										</div>
										{this.state.createArtist && (<p className="help">artista não encontrado... gostaria de <a onClick={() => this.setState({ modalArtist: true })}>cadastra-lo</a>?</p>)}
									</div>
								</div>
								<div className="column is-4">
									<div className="field">
										<label className="label">Álbum</label>
										<div className="control has-icons-left has-icons-right">
											<input
												className="input"
												type="text"
												placeholder="Álbum"
												value={music.album.name}
												onChange={(e) => this.setAlbum(e.target.value)} />
											<span className="icon is-small is-left">
												<i className="fw fas fa-record-vinyl"></i>
											</span>
										</div>
									</div>
								</div>
								<div className="column is-4">
									<div className="field">
										<label className="label">Batera</label>
										<div className="control has-icons-left has-icons-right">
											<input
												className="input"
												type="text"
												placeholder="Batera"
												value={music.author.name}
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
