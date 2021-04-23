import React, { useEffect, useState } from "react";
import Head from "next/head";
import { Session } from "next-auth";
import { getSession } from "next-auth/client";
import Slugify from "slugify";
import AsyncSelect from 'react-select/async';
import { PROJECT } from "../../project";
import Container from "../../components/layout/container"
import Drummer from "../../components/shared/drummer";
import Breadcrumb from "../../components/shared/breadcrumb";
import Notification from "../../components/shared/notification";
import Drum from "../../models/drum";
import Music from "../../models/music";
import MusicResponse from "../../interfaces/music-response"
import MusicService from "../../services/music-service";
import ArtistService from "../../services/artist-service";
import AlbumService from "../../services/album-service";
import AuthorService from "../../services/author-service";
import Modal from "../../components/shared/modal";

interface Props {
	session: Session,
	music: Music
}

interface State {
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
			message: null,
			music: null
		}
	}

	if (session) {
		return {
			props: {
				session,
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

export default function MusicEditorPage(props) {
	const musicService: MusicService = new MusicService();
	const artistService: ArtistService = new ArtistService();
	const albumService: AlbumService = new AlbumService();
	const authorService: AuthorService = new AuthorService();
	const drum: Drum = new Drum();
	const [music, setMusic] = useState(new Music(props.music));
	const [message, setMessage] = useState(null);
	const [messageSlug, setMessageSlug] = useState(null);
	const [loading, setLoading] = useState(false);
	const [loadingSlug, setLoadingSlug] = useState(false);
	const [createArtist, setCreateArtist] = useState(false);
	const [createAlbum, setCreateAlbum] = useState(false);
	const [createAuthor, setCreateAuthor] = useState(false);
	const [modalArtist, setModalArtist] = useState(false);
	const [modalAlbum, setModalAlbum] = useState(false);
	const [modalAuthor, setModalAuthor] = useState(false);

	let pageTitle: string = music.name ? `Atualizar Música "${music.name}"` : "Cadastrar Música";

	const setName = (name) => {
		let newMusic = new Music(music);

		newMusic.name = name;

		setMusic(newMusic);
	}

	const setSlug = async (slug) => {
		let newMusic = new Music(music);

		newMusic.slug = slug;

		let message = newMusic.validateSlug(slug);

		if (message) {
			setMessageSlug(message);
		} else {
			setLoadingSlug(true);

			musicService.exists(slug)
				.then((result) => (result) ? setMessageSlug("slug already exists!") : setMessageSlug(null))
				.catch((result) => setMessage(result))
				.finally(() => setLoadingSlug(false));
		}

		setMusic(newMusic);
	}

	const setArtist = (artist) => {
		let newMusic = new Music(music);

		newMusic.artist = artist.data;

		setMusic(newMusic);
	}

	const setAlbum = (album) => {
		let newMusic = new Music(music);

		newMusic.album = album;

		setMusic(newMusic);
	}

	const setAuthor = (author) => {
		let newMusic = new Music(music);

		newMusic.author = author;

		setMusic(newMusic);
	}

	const setTablature = (tablature) => {
		let newMusic = new Music(music);

		newMusic.tablature = tablature;

		setMusic(newMusic);
	}

	const setDefaultSlug = () => {
		if (music.name && !music.slug) {
			setSlug(Slugify(music.name, { lower: true }));
		}
	}

	const searchArtists = (value, callback) => {
		if (value.length < 3) {
			callback();
		} else {
			artistService.search({ name: value })
				.then((result) => {
					let options = [];

					result.map((artist) => {
						options.push({
							label: artist.name,
							value: artist.name,
							data: artist
						});
					});

					callback(options);
				})
				.catch((error) => {
					setCreateArtist(true)
					callback();
				});
		}
	}

	const searchAlbum = (value, callback) => {
		if (value.length < 3) {
			callback();
		} else {
			albumService.search({ name: value })
				.then((result) => {
					let options = [];

					result.map((album) => {
						options.push({
							label: album.name,
							value: album.name,
							data: album
						});
					});

					callback(options);
				})
				.catch((error) => {
					setCreateAlbum(true)
					callback();
				});
		}
	}

	const searchAuthor = (value, callback) => {
		if (value.length < 3) {
			callback();
		} else {
			authorService.search({ name: value })
				.then((result) => {
					let options = [];

					result.map((author) => {
						options.push({
							label: author.name,
							value: author.name,
							data: author
						});
					});

					callback(options);
				})
				.catch((error) => {
					setCreateAuthor(true)
					callback();
				});
		}
	}

	const handleSubmit = async (e) => {
		e.preventDefault();

		setLoading(true);

		musicService.insert(music)
			.then((result) => setMusic(new Music(result)))
			.catch((error) => setMessage(error.message))
			.finally(() => setLoading(false));
	}

	return (
		<Container>
			<Head>
				<title>{pageTitle} | {PROJECT.TITLE}</title>
			</Head>

			{message && (<Notification onClose={() => setMessage(null)}>{message}</Notification>)}

			{modalArtist && (<Modal title="Artist" onClose={() => setModalArtist(false)}>Lorem ipsum dolor</Modal>)}
			{modalAlbum && (<Modal title="Album" onClose={() => setModalAlbum(false)}>Lorem ipsum dolor</Modal>)}
			{modalAuthor && (<Modal title="Author" onClose={() => setModalAuthor(false)}>Lorem ipsum dolor</Modal>)}

			<form onSubmit={handleSubmit}>
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
									onChange={(e) => setName(e.target.value)}
									autoFocus />
								<span className="icon is-small is-left">
									<i className="fw fas fa-music"></i>
								</span>
							</div>
						</div>

						<div className="field">
							<div className={`control has-icons-left has-icons-right is-small ${loadingSlug ? "is-loading" : ""}`}>
								<input
									className="input is-small"
									type="text"
									placeholder="Slug"
									value={music.slug}
									onFocus={setDefaultSlug}
									onChange={(e) => setSlug(e.target.value)} />
								<span className="icon is-small is-left">
									<i className="fw fas fa-link"></i>
								</span>
							</div>
							{messageSlug && (<p className="help">{messageSlug}</p>)}
						</div>

						<div className="columns">
							<div className="column is-4">
								<div className="field">
									<label className="label">Artista *</label>
									<div className="control">
										<AsyncSelect
											placeholder="Artist"
											instanceId="artist"
											loadOptions={searchArtists}
											onChange={(e) => setArtist(e)} />
									</div>
									{createArtist && (<p className="help">artista não encontrado... gostaria de <a onClick={() => setModalArtist(true)}>cadastra-lo</a>?</p>)}
								</div>
							</div>
							<div className="column is-4">
								<div className="field">
									<label className="label">Álbum</label>
									<div className="control">
										<AsyncSelect
											placeholder="Album"
											instanceId="album"
											loadOptions={searchAlbum}
											onChange={(e) => setAlbum(e)} />
									</div>
									{createAlbum && (<p className="help">album não encontrado... gostaria de <a onClick={() => setModalAlbum(true)}>cadastra-lo</a>?</p>)}
								</div>
							</div>
							<div className="column is-4">
								<div className="field">
									<label className="label">Batera</label>
									<div className="control">
										<AsyncSelect
											placeholder="Drummer"
											instanceId="author"
											loadOptions={searchAuthor}
											onChange={(e) => setAuthor(e)} />
									</div>
									{createAuthor && (<p className="help">batera não encontrado... gostaria de <a onClick={() => setModalAuthor(true)}>cadastra-lo</a>?</p>)}
								</div>
							</div>
						</div>
					</section>
				</div>

				<div className="container is-fluid has-background-grey-lighter">
					<Drummer drum={drum} tablature={music.tablature} edit={true} onTablatureChange={() => setTablature.bind(this)} />
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
