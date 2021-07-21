import { useState } from 'react';
import { FaLink } from 'react-icons/fa';
import { toast } from 'react-toastify';
import slugify from 'slugify';
import Artist from '../../models/Artist';
import ArtistService from '../../services/ArtistService';

export default function ArtistForm(props) {
	const [artist, setArtist] = useState(new Artist(props.artist));
	const [loading, setLoading] = useState(false);
	const [messageId, setMessageId] = useState(null);
	const [loadingId, setLoadingId] = useState(false);

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

			<button type='submit' className='button is-primary' disabled={!artist.isValid()}>
				Salvar
			</button>
		</form>
	);
}
