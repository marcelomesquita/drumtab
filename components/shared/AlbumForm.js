import { useState } from 'react';
import { FaLink } from 'react-icons/fa';
import { toast } from 'react-toastify';
import slugify from 'slugify';
import Album from '../../models/Album';
import AlbumService from '../../services/AlbumService';

export default function AlbumForm(props) {
	const [album, setAlbum] = useState(new Album(props.album));
	const [loading, setLoading] = useState(false);
	const [messageId, setMessageId] = useState(null);
	const [loadingId, setLoadingId] = useState(false);

	const setId = async (id) => {
		album.id = id;

		const message = album.validateId(id);

		if (message) {
			setMessageId(message);
		} else {
			setLoadingId(true);

			AlbumService.exists(id)
				.then(() => setMessageId('slug already exists!'))
				.catch(() => setMessageId(null))
				.finally(() => setLoadingId(false));
		}

		setAlbum(new Album(album));
	};

	const setName = (name) => {
		album.name = name;

		setAlbum(new Album(album));
	};

	const setDefaultId = () => {
		if (album.name && !album.id) {
			setId(slugify(album.name, { lower: true }));
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		setLoading(true);

		AlbumService.save(album)
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
					<input className='input is-large' type='text' name='name' value={album.name} onChange={(e) => setName(e.target.value)} autoFocus />
				</div>
			</div>

			<div className='field'>
				<div className={`control has-icons-left has-icons-right is-small ${loadingId ? 'is-loading' : ''}`}>
					<input className='input is-small' type='text' value={album.id} onFocus={setDefaultId} onChange={(e) => setId(e.target.value)} />
					<span className='icon is-small is-left'>
						<FaLink />
					</span>
				</div>
				{messageId && <p className='help'>{messageId}</p>}
			</div>

			<button type='submit' className='button is-primary' disabled={!album.isValid()}>
				Salvar
			</button>
		</form>
	);
}
