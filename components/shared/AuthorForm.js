import { useState } from 'react';
import { FaLink } from 'react-icons/fa';
import { toast } from 'react-toastify';
import slugify from 'slugify';
import Author from '../../models/Author';
import AuthorService from '../../services/AuthorService';

export default function AuthorForm(props) {
	const [author, setAuthor] = useState(new Author(props.author));
	const [loading, setLoading] = useState(false);
	const [messageId, setMessageId] = useState(null);
	const [loadingId, setLoadingId] = useState(false);

	const setId = async (id) => {
		author.id = id;

		const message = author.validateId(id);

		if (message) {
			setMessageId(message);
		} else {
			setLoadingId(true);

			AuthorService.exists(id)
				.then(() => setMessageId('slug already exists!'))
				.catch(() => setMessageId(null))
				.finally(() => setLoadingId(false));
		}

		setAuthor(new Author(author));
	};

	const setName = (name) => {
		author.name = name;

		setAuthor(new Author(author));
	};

	const setDefaultId = () => {
		if (author.name && !author.id) {
			setId(slugify(author.name, { lower: true }));
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		setLoading(true);

		AuthorService.save(author)
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
					<input className='input is-large' type='text' name='name' value={author.name} onChange={(e) => setName(e.target.value)} autoFocus />
				</div>
			</div>

			<div className='field'>
				<div className={`control has-icons-left has-icons-right is-small ${loadingId ? 'is-loading' : ''}`}>
					<input className='input is-small' type='text' value={author.id} onFocus={setDefaultId} onChange={(e) => setId(e.target.value)} />
					<span className='icon is-small is-left'>
						<FaLink />
					</span>
				</div>
				{messageId && <p className='help'>{messageId}</p>}
			</div>

			<button type='submit' className='button is-primary' disabled={!author.isValid()}>
				Salvar
			</button>
		</form>
	);
}
