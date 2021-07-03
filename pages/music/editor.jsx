import React, { useState } from 'react';
import Error from 'next/error';
import Head from 'next/head';
import Slugify from 'slugify';
import { toast } from 'react-toastify';
import AsyncSelect from 'react-select/async';
import { FaLink } from 'react-icons/fa';
import Container from 'components/layout/Container';
import Drummer from 'components/shared/Drummer';
import Breadcrumb from 'components/shared/Breadcrumb';
import Modal from 'components/shared/Modal';
import Drum from 'models/Drum';
import Music from 'models/Music';
import ArtistService from 'services/ArtistService';
import AlbumService from 'services/AlbumService';
import AuthorService from 'services/AuthorService';
import MusicService from 'services/MusicService';
import { getSession } from 'services/AuthService';
import MusicRepository from 'repository/MusicRepository';

export async function getServerSideProps(context) {
	try {
		const id = context.query?.id;
		const session = await getSession(context);

		if (!session) {
			return { props: { error: { code: 403, message: 'You must login to access this page' } } };
		}

		if (id) {
			return MusicRepository.load(id)
				.then((result) => ({ props: { music: result } }))
				.catch(() => ({ props: { error: { code: 404, message: 'Page not found' } } }));
		}

		return { props: {} };
	} catch (e) {
		return { props: { error: { code: 500, message: e.toString() } } };
	}
}

export default function MusicEditorPage(props) {
	const drum = new Drum();
	const [music, setMusic] = useState(new Music(props.music));
	const [messageId, setMessageId] = useState(null);
	const [loading, setLoading] = useState(false);
	const [loadingId, setLoadingId] = useState(false);
	const [createArtist, setCreateArtist] = useState(false);
	const [createAlbum, setCreateAlbum] = useState(false);
	const [createAuthor, setCreateAuthor] = useState(false);
	const [modalArtist, setModalArtist] = useState(false);
	const [modalAlbum, setModalAlbum] = useState(false);
	const [modalAuthor, setModalAuthor] = useState(false);

	if (props.error) {
		return <Error statusCode={props.error.code} title={props.error.message} />;
	}

	const pageTitle = music.name ? `Atualizar Música "${music.name}"` : 'Cadastrar Música';

	const setId = async (id) => {
		music.id = id;

		const message = music.validateId(id);

		if (message) {
			setMessageId(message);
		} else {
			setLoadingId(true);

			MusicRepository.exists(id)
				.then((result) => (result ? setMessageId('slug already exists!') : setMessageId(null)))
				.catch((result) => toast.dark(result))
				.finally(() => setLoadingId(false));
		}

		setMusic(new Music(music));
	};

	const setName = (name) => {
		music.name = name;

		setMusic(new Music(music));
	};

	const setArtist = (artist) => {
		music.artist = artist;

		setMusic(new Music(music));
	};

	const setAlbum = (album) => {
		music.album = album;

		setMusic(new Music(music));
	};

	const setAuthor = (author) => {
		music.author = author;

		setMusic(new Music(music));
	};

	const setTablature = (tablature) => {
		music.tablature = tablature;

		setMusic(new Music(music));
	};

	const setDefaultId = () => {
		if (music.name && !music.id) {
			setId(Slugify(music.name, { lower: true }));
		}
	};

	const searchArtists = (value, callback) => {
		ArtistService.listByName(value)
			.then((result) => {
				const options = result.map((artist) => ({
					label: artist.name,
					value: artist,
				}));

				callback(options);
			})
			.catch(() => {
				setCreateArtist(true);
				callback();
			});
	};

	const searchAlbum = (value, callback) => {
		AlbumService.listByName(value)
			.then((result) => {
				const options = result.map((album) => ({
					label: album.name,
					value: album,
				}));

				callback(options);
			})
			.catch(() => {
				setCreateAlbum(true);
				callback();
			});
	};

	const searchAuthor = (value, callback) => {
		AuthorService.listByName(value)
			.then((result) => {
				const options = result.map((author) => ({
					label: author.name,
					value: author,
				}));

				callback(options);
			})
			.catch(() => {
				setCreateAuthor(true);
				callback();
			});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		setLoading(true);

		MusicService.save(music)
			.then((result) => toast.dark(result.message))
			.catch((error) => toast.dark(error.message))
			.finally(() => setLoading(false));
	};

	return (
		<Container>
			<Head>
				<title>{pageTitle} | {process.env.NEXT_PUBLIC_TITLE}</title>
			</Head>

			{modalArtist && (<Modal title='Artist' onClose={() => setModalArtist(false)}>Lorem ipsum dolor</Modal>)}
			{modalAlbum && (<Modal title='Album' onClose={() => setModalAlbum(false)}>Lorem ipsum dolor</Modal>)}
			{modalAuthor && (<Modal title='Author' onClose={() => setModalAuthor(false)}>Lorem ipsum dolor</Modal>)}

			<form onSubmit={handleSubmit}>
				<div className='container is-widescreen'>
					<section className='section is-clearfix'>
						<Breadcrumb />

						<h1 className='title'>Nova Música</h1>

						<div className='field'>
							<label className='label'>Música *</label>
							<div className='control'>
								<input className='input is-large' type='text' name='name' value={music.name} onChange={(e) => setName(e.target.value)} autoFocus />
							</div>
						</div>

						<div className='field'>
							<div className={`control has-icons-left has-icons-right is-small ${loadingId ? 'is-loading' : ''}`}>
								<input className='input is-small' type='text' value={music.id} onFocus={setDefaultId} onChange={(e) => setId(e.target.value)} />
								<span className='icon is-small is-left'>
									<FaLink />
								</span>
							</div>
							{messageId && <p className='help'>{messageId}</p>}
						</div>

						<div className='columns'>
							<div className='column is-4'>
								<div className='field'>
									<label className='label'>Artista *</label>
									<div className='control'>
										<AsyncSelect
											instanceId='artist'
											defaultValue={{ value: music.artist, label: music.artist?.name }}
											loadOptions={searchArtists}
											onChange={(e) => setArtist(e.value)}
											isClearable={true}
										/>
									</div>
									{createArtist && (<p className='help'>artista não encontrado... gostaria de <a onClick={() => setModalArtist(true)}>cadastra-lo</a>?</p>)}
								</div>
							</div>
							<div className='column is-4'>
								<div className='field'>
									<label className='label'>Álbum</label>
									<div className='control'>
										<AsyncSelect
											instanceId='album'
											defaultValue={{ value: music.album, label: music.album?.name }}
											loadOptions={searchAlbum}
											onChange={(e) => setAlbum(e.value)}
											isClearable={true}
										/>
									</div>
									{createAlbum && (<p className='help'>album não encontrado... gostaria de <a onClick={() => setModalAlbum(true)}>cadastra-lo</a>?</p>)}
								</div>
							</div>
							<div className='column is-4'>
								<div className='field'>
									<label className='label'>Batera</label>
									<div className='control'>
										<AsyncSelect
											instanceId='author'
											defaultValue={{ value: music.author, label: music.author?.name }}
											loadOptions={searchAuthor}
											onChange={(e) => setAuthor(e.value)}
											isClearable={true}
										/>
									</div>
									{createAuthor && (<p className='help'>batera não encontrado... gostaria de <a onClick={() => setModalAuthor(true)}>cadastra-lo</a>?</p>)}
								</div>
							</div>
						</div>
					</section>
				</div>

				<div className='container is-fluid has-background-grey-lighter'>
					<Drummer drum={drum} tablature={music.tablature} edit={true} onTablatureChange={() => setTablature.bind(this)} />
				</div>

				<div className='container is-widescreen'>
					<section className='section'>
						<button type='submit' className='button is-primary' disabled={!music.isValid()}>
							Salvar
						</button>
					</section>
				</div>
			</form>
		</Container>
	);
}
