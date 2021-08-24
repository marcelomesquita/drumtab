import { useState } from 'react';
import { FaLink } from 'react-icons/fa';
import { toast } from 'react-toastify';
import slugify from 'slugify';
import { storage } from '../../adapters/firebaseClient';
import Artist from '../../models/Artist';
import ArtistService from '../../services/ArtistService';

export default function ArtistForm(props) {
	const [artist, setArtist] = useState(new Artist(props.artist));
	const [loading, setLoading] = useState(false);
	const [messageId, setMessageId] = useState(null);
	const [loadingId, setLoadingId] = useState(false);
	const [messageImage, setMessageImage] = useState(null);
	const [loadingImage, setLoadingImage] = useState(false);

	const setId = async (id) => {
		artist.id = id;

		const message = artist.validateId(id);

		if (message) {
			setMessageId(message);
		} else {
			setLoadingId(true);

			ArtistService.exists(id)
				.then(() => setMessageId('slug already exists!'))
				.catch(() => setMessageId(null))
				.finally(() => setLoadingId(false));
		}

		setArtist(new Artist(artist));
	};

	const setName = (name) => {
		artist.name = name;

		setArtist(new Artist(artist));
	};

	const setDefaultId = () => {
		if (artist.name && !artist.id) {
			setId(slugify(artist.name, { lower: true }));
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		setLoading(true);

		ArtistService.save(artist)
			.then((result) => {
				toast.dark(result.message);

				if (props.onSave) {
					props.onSave();
				}
			})
			.catch((error) => toast.dark(error.message))
			.finally(() => setLoading(false));
	};

	const handleUpload = async (e) => {
		const image = e.target.files[0];

		if (image.size > 100000) {
			setMessageImage('A imagem deve ter menos de 100KB');

			return false;
		}

		setLoadingImage(true);

		const name = [...Array(16)].map(i => (~~(Math.random() * 36)).toString(36)).join('');
		const ref = storage.ref(`/images/artists/${name}`);
    const uploadTask = ref.put(image);

    uploadTask.on('state_changed', console.log, console.error, () => {
			uploadTask.snapshot.ref.getDownloadURL().then((url) => {
          artist.image = url;

					setArtist(new Artist(artist));
        });

			setLoadingImage(false);
    });
	}

	return (
		<form onSubmit={handleSubmit}>
			<div className='field'>
				<label className='label'>Nome *</label>
				<div className='control'>
					<input className='input is-large' type='text' name='name' value={artist.name} onChange={(e) => setName(e.target.value)} autoFocus />
				</div>
			</div>

			<div className='field'>
				<div className={`control has-icons-left has-icons-right is-small ${loadingId ? 'is-loading' : ''}`}>
					<input className='input is-small' type='text' value={artist.id} onFocus={setDefaultId} onChange={(e) => setId(e.target.value)} />
					<span className='icon is-small is-left'>
						<FaLink />
					</span>
				</div>
				{messageId && <p className='help'>{messageId}</p>}
			</div>

			<div className='field'>
				<label className='label'>Imagem *</label>
				<div className={`control has-icons-right ${loadingImage ? 'is-loading' : ''}`}>
					<input className='input' type='file' name='image' accept='.jpg, .jpeg' onChange={handleUpload} />
				</div>
				{messageImage && <p className='help'>{messageImage}</p>}
			</div>

			<button type='submit' className='button is-primary' disabled={!artist.isValid()}>
				Salvar
			</button>
		</form>
	);
}
