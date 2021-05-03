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
								? (<a className="navbar-item" onClick={() => auth.signIn()} title="login"><span className="icon is-small"><FaSignInAlt /></span></a>)
								: (
									<div className="navbar-item has-dropdown is-hoverable">
										<a className="navbar-link is-arrowless">
											<img src={auth.user.avatar} />
										</a>
										<div className="navbar-dropdown is-right">
											<div className="navbar-item">
												<strong>{auth.user.name}</strong>
											</div>
											<div className="navbar-item">
												{auth.user.email}
											</div>
											<hr className="navbar-divider" />
											<a className="navbar-item">
												profile
											</a>
											<a className="navbar-item">
												minhas músicas
											</a>
											<a className="navbar-item">
												minha bateria
											</a>
											<hr className="navbar-divider" />
											<a className="navbar-item has-text-danger" onClick={() => auth.signOut()} title="sair">
												sair
											</a>
										</div>
									</div>
								)
							}
						</div>
					</div>
				</div>
			</nav>
		</header>
	)
}
