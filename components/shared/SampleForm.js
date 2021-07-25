import React, { useState } from 'react';
import Slugify from 'slugify';
import { toast } from 'react-toastify';
import { FaLink } from 'react-icons/fa';
import Drummer from './Drummer';
import Drum from '../../models/Drum';
import Sample from '../../models/Sample';
import SamplesService from '../../services/SamplesService';

export default function SampleForm(props) {
	const drum = new Drum();
	const [sample, setSample] = useState(new Sample(props.sample));
	const [loading, setLoading] = useState(false);
	const [messageId, setMessageId] = useState(null);
	const [loadingId, setLoadingId] = useState(false);

	const setId = async (id) => {
		sample.id = id;

		const message = sample.validateId(id);

		if (message) {
			setMessageId(message);
		} else {
			setLoadingId(true);

			SamplesService.exists(id)
				.then(() => setMessageId('slug already exists!'))
				.catch(() => setMessageId(null))
				.finally(() => setLoadingId(false));
		}

		setSample(new Sample(sample));
	};

	const setName = (name) => {
		sample.name = name;

		setSample(new Sample(sample));
	};

	const setTablature = (tablature) => {
		sample.tablature = tablature;

		setSample(new Sample(sample));
	};

	const setDefaultId = () => {
		if (sample.name && !sample.id) {
			setId(Slugify(sample.name, { lower: true }));
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		setLoading(true);

		SamplesService.save(sample)
			.then((result) => toast.dark(result.message))
			.catch((error) => toast.dark(error.message))
			.finally(() => setLoading(false));
	};

	return (
		<>
			<form onSubmit={handleSubmit}>
				<div className='container is-widescreen'>
					<section className='section is-clearfix mt-0 pt-0'>
						<div className='field'>
							<label className='label'>Nome *</label>
							<div className='control'>
								<input className='input is-large' type='text' name='name' value={sample.name} onChange={(e) => setName(e.target.value)} autoFocus />
							</div>
						</div>

						<div className='field'>
							<div className={`control has-icons-left has-icons-right is-small ${loadingId ? 'is-loading' : ''}`}>
								<input className='input is-small' type='text' value={sample.id} onFocus={setDefaultId} onChange={(e) => setId(e.target.value)} />
								<span className='icon is-small is-left'>
									<FaLink />
								</span>
							</div>
							{messageId && <p className='help'>{messageId}</p>}
						</div>
					</section>
				</div>

				<div className='container is-fluid has-background-grey-lighter'>
					<Drummer drum={drum} tablature={sample.tablature} edit={true} onTablatureChange={() => setTablature.bind(this)} />
				</div>

				<div className='container is-widescreen'>
					<section className='section'>
						<button type='submit' className='button is-primary' disabled={!sample.isValid()}>
							Salvar
						</button>
					</section>
				</div>
			</form>
		</>
	);
}
