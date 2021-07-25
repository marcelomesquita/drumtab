import Link from 'next/link';
import React from 'react';
import packageJson from '../../package.json';

export default function Footer() {
	return (
		<footer className='footer has-background-light pb-0'>
			<div className='container is-widescreen'>
				<section className='section'>
					<div className='columns'>
						<div className='column is-one-third'>
							<h2 className='title is-2'>{process.env.NEXT_PUBLIC_TITLE}</h2>
						</div>
						<div className='column'>
							<h6 className='title is-7 has-text-primary-dark'>MÚSICAS</h6>
							<ul className='content'>
								<li>
									<Link href='/'>
										<a className='has-text-primary'>lançamentos</a>
									</Link>
								</li>
								<li>
									<Link href='/'>
										<a className='has-text-primary'>populares</a>
									</Link>
								</li>
								<li>
									<Link href='/'>
										<a className='has-text-primary'>artistas</a>
									</Link>
								</li>
								<li>
									<Link href='/'>
										<a className='has-text-primary'>álbuns</a>
									</Link>
								</li>
							</ul>
						</div>
						<div className='column'>
							<h6 className='title is-7 has-text-primary-dark'>PARTICIPE</h6>
							<ul className='content'>
								<li>
									<Link href='/musics/editor'>
										<a className='has-text-primary'>cadastre músicas</a>
									</Link>
								</li>
								<li>
									<Link href='/samples/editor'>
										<a className='has-text-primary'>cadastre samples</a>
									</Link>
								</li>
								<li>
									<span className='has-text-lighter'>monte sua bateria</span>
								</li>
							</ul>
						</div>
						<div className='column'>
							<h6 className='title is-7 has-text-primary-dark'>DRUMTAB</h6>
							<ul className='content'>
								<li>
									<Link href='/about'>
										<a className='has-text-primary'>sobre</a>
									</Link>
								</li>
								<li>
									<Link href='/help'>
										<a className='has-text-primary'>ajuda</a>
									</Link>
								</li>
								<li>
									<Link href='/terms'>
										<a className='has-text-primary'>termos de uso</a>
									</Link>
								</li>
							</ul>
						</div>
					</div>
				</section>

				<section className='section'>
					<div className='columns'>
						<div className='column'>
							<div className='content is-small has-text-grey'>
								<p>
									&copy; {process.env.NEXT_PUBLIC_TITLE} by <a href={packageJson.author.url} target='_blank' rel='noreferrer' className='has-text-primary'>{packageJson.author.name}</a>
								</p>
							</div>
						</div>
						<div className='column'>
							<div className='content is-small has-text-grey has-text-right'>
								<p>{packageJson.version}</p>
							</div>
						</div>
					</div>
				</section>
			</div>
		</footer>
	);
}
