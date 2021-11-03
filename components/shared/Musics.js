import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import artistImage from 'assets/images/artist.jpg';

export default function Musics(props) {
	return (
		<div className='columns is-multiline'>
			{props.musics.map((music) => {
				return (
					<div key={music.id} className='column is-4'>
						<Link href={`/musics/${music.id}`}>
							<a>
								<div className='card music'>
									<div className='card-image'>
										<figure className='image'>
											<Image src={music.artist?.image ? music.artist.image : artistImage} alt={music.artist.name} width={400} height={400} />
										</figure>
									</div>
									<div className='card-content'>
										<div className='content'>
											<p className='title is-5' data-testid='music-title'>{music.name}</p>
											<p className='subtitle is-6' data-testid='music-artist'>{music.artist.name}</p>
										</div>
									</div>
								</div>
							</a>
						</Link>
					</div>
				);
			})}
		</div>
	);
}
