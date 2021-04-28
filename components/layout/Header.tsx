import { useContext } from 'react';
import Link from 'next/link';
import { FaSearch, FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import { project } from '../../configs/project';
import { AuthContext } from '../../contexts/Auth';

export default function Header() {
	const auth = useContext(AuthContext);

	const toggleStyles = (e) => {
		document.querySelector('#burger').classList.toggle('is-active')
		document.querySelector('#mainbar').classList.toggle('is-active')
	}

	return (
		<header>
			<nav className="navbar is-primary" role="navigation" aria-label="main navigation">
				<div className="container is-widescreen">
					<div className="navbar-brand">
						<Link href="/"><a className="navbar-item"><strong>{project.title}</strong></a></Link>

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
									<span className="icon is-small is-right"><FaSearch /></span>
								</div>
							</div>

							{!auth.user
								? (<a className="navbar-item" onClick={auth.signIn} title="login"><span className="icon is-small"><FaSignInAlt /></span></a>)
								: (<a className="navbar-item" onClick={auth.signOut} title={`sair (${auth.user.email})`}><span className="icon is-small"><FaSignOutAlt /></span></a>)
							}
						</div>
					</div>
				</div>
			</nav>
		</header>
	)
}
