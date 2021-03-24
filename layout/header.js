import Link from 'next/link';

function Header() {
	const toggleStyles = (event) => {
		document.querySelector('#burger').classList.toggle('is-active')
		document.querySelector('#mainbar').classList.toggle('is-active')
	}

	return (
		<header>
			<nav className="navbar is-primary" role="navigation" aria-label="main navigation">
				<div className="navbar-brand">
					<Link href="/"><a className="navbar-item"><strong>Drumtab</strong></a></Link>

					<a className="navbar-burger" onClick={toggleStyles} id="burger" role="button" aria-label="menu" aria-expanded="false" data-target="mainbar">
						<span aria-hidden="true"></span>
						<span aria-hidden="true"></span>
						<span aria-hidden="true"></span>
					</a>
				</div>

				<div className="navbar-menu" id="mainbar">
					<div className="navbar-start">
						<Link href="/"><a className="navbar-item">Home</a></Link>
						<Link href="/music"><a className="navbar-item">Músicas</a></Link>
						<Link href="/sample"><a className="navbar-item">Samples</a></Link>
						<Link href="/drum"><a className="navbar-item">Baterias</a></Link>
					</div>

					<div className="navbar-end">
						<div className="navbar-item">
							<div className="buttons">
								<Link href="/signup"><a className="button is-primary">Sign up</a></Link>
								<Link href="/signin"><a className="button is-light">Sign in</a></Link>
							</div>
						</div>
					</div>
				</div>
			</nav>
		</header>
	)
}

export default Header;
