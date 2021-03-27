import Head from "next/head";
import Link from "next/link";
import Footer from "layout/footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";

function Home() {
	return (
		<>
			<Head>
				<title>Login | Drumtab</title>
			</Head>

			<div className="has-background-light">
				<div className="container">
					<div className="columns">
						<div className="column is-6 is-offset-3">
							<section className="section is-large">
								<h1 className="title has-text-centered">DrumTab</h1>

								<div className="card">
									<div className="card-content">
										<div className="content">
											<div className="field">
												<label className="label">E-mail</label>
												<div className="control has-icons-left">
													<input className="input" type="email" placeholder="Email" />
													<span className="icon is-small is-left">
														<FontAwesomeIcon icon={faEnvelope} />
													</span>
												</div>
											</div>
											<div className="field">
												<Link href="/recovery"><a className="is-pulled-right">esqueci a senha</a></Link>
												<label className="label">Senha</label>
												<div className="control has-icons-left">
													<input className="input" type="password" placeholder="Password" />
													<span className="icon is-small is-left">
														<FontAwesomeIcon icon={faLock} />
													</span>
												</div>
											</div>
											<div className="field">
												<div className="control">
													<button className="button is-success is-fullwidth">Login</button>
												</div>
											</div>
										</div>
									</div>
								</div>

								<div className="content mt-5">
									<p>Ainda não tem uma conta? <Link href="/register"><a className="">Registre-se!</a></Link></p>
								</div>
							</section>
						</div>
					</div>
				</div>
			</div>

			<Footer menu={false} />
		</>
	)
}

export default Home;
