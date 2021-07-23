import React, { useEffect, useState } from 'react';
import Slugify from 'slugify';
import AsyncSelect from 'react-select/async';
import { toast } from 'react-toastify';
import { FaLink } from 'react-icons/fa';
import Modal from '../../components/helpers/Modal';
import Drummer from '../../components/shared/Drummer';
import ArtistForm from '../../components/shared/ArtistForm';
import AlbumForm from '../../components/shared/AlbumForm';
import AuthorForm from '../../components/shared/AuthorForm';
import Drum from '../../models/Drum';
import Music from '../../models/Music';
import ArtistService from '../../services/ArtistService';
import AlbumService from '../../services/AlbumService';
import AuthorService from '../../services/AuthorService';
import MusicService from '../../services/MusicService';

export default function MusicForm(props) {
	const drum = new Drum();
	const [music, setMusic] = useState(new Music(props.music));
	const [loading, setLoading] = useState(false);
	const [messageId, setMessageId] = useState(null);
	const [loadingId, setLoadingId] = useState(false);
	const [createArtist, setCreateArtist] = useState(false);
	const [createAlbum, setCreateAlbum] = useState(false);
	const [createAuthor, setCreateAuthor] = useState(false);
	const [modalArtist, setModalArtist] = useState(false);
	const [showModalArtist, setShowModalArtist] = useState(false);
	const [modalAlbum, setModalAlbum] = useState(false);
	const [showModalAlbum, setShowModalAlbum] = useState(false);
	const [modalAuthor, setModalAuthor] = useState(false);
	const [showModalAuthor, setShowModalAuthor] = useState(false);

	useEffect(() => setShowModalArtist(modalArtist), [modalArtist]);
	useEffect(() => setShowModalAlbum(modalAlbum), [modalAlbum]);
	useEffect(() => setShowModalAuthor(modalAuthor), [modalAuthor]);

	const setId = async (id) => {
		music.id = id;

		const message = music.validateId(id);

		if (message) {
			setMessageId(message);
		} else {
			setLoadingId(true);

			MusicService.exists(id)
				.then(() => setMessageId('slug already exists!'))
				.catch(() => setMessageId(null))
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
		<>
			{showModalArtist && (<Modal title='Artist' onClose={() => setModalArtist(false)}><ArtistForm onSave={() => setModalArtist(false)} /></Modal>)}
			{showModalAlbum && (<Modal title='Album' onClose={() => setModalAlbum(false)}><AlbumForm onSave={() => setModalAlbum(false)} /></Modal>)}
			{showModalAuthor && (<Modal title='Author' onClose={() => setModalAuthor(false)}><AuthorForm onSave={() => setModalAuthor(false)} /></Modal>)}

			<form onSubmit={handleSubmit}>
				<div className='container is-widescreen'>
					<section className='section is-clearfix mt-0 pt-0'>
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
											onChange={(e) => setArtist(e?.value)}
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
											onChange={(e) => setAlbum(e?.value)}
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
											onChange={(e) => setAuthor(e?.value)}
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
		</>
	);
}
