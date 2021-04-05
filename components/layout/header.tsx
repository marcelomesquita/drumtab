import { signIn, signOut, useSession } from 'next-auth/client';
import Link from 'next/link';
import { PROJECT } from '../../models/project';

function Header() {
	const [session, loading] = useSession();

	const toggleStyles = (event) => {
		document.querySelector('#burger').classList.toggle('is-active')
		document.querySelector('#mainbar').classList.toggle('is-active')
	}

	const signInOut = () => {
		if (!session) {
			return <a className="navbar-item" onClick={() => signIn()} title="login"><span className="icon is-small"><i className="fas fa-sign-in-alt" /></span></a>;
		} else {
			return <a className="navbar-item" onClick={() => signOut()} title={`sair (${session.user.email})`}><span className="icon is-small"><i className="fas fa-sign-out-alt" /></span></a>
		}
	}

	return (
		<header>
			<nav className="navbar is-primary" role="navigation" aria-label="main navigation">
				<div className="container is-widescreen">
					<div className="navbar-brand">
						<Link href="/"><a className="navbar-item"><strong>{PROJECT.TITLE}</strong></a></Link>

						<a className="navbar-burger" onClick={toggleStyles} id="burger" role="button" aria-label="menu" aria-expanded="false" data-target="mainbar">
							<span aria-hidden="true"></span>
							<span aria-hidden="true"></span>
							<span aria-hidden="true"></span>
						</a>
					</div>

					<div className="navbar-menu" id="mainbar">
						<div className="navbar-start">
							<Link href="/music"><a className="navbar-item">Músicas</a></Link>
						</div>

						<div className="navbar-end">
							<div className="navbar-item">
								<div className="control has-icons-right">
									<input className="input has-background-grey-darker has-text-light is-borderless" type="text" placeholder="search" />
									<span className="icon is-small is-right"><i className="fw fas fa-search" /></span>
								</div>
							</div>

							{signInOut()}
						</div>
					</div>
				</div>
			</nav>
		</header>
	)
}

export default Header;
