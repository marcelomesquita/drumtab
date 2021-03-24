import Footer from './footer';
import Header from './header';

function Container({ children }) {
	return (
		<>
			<Header />

			<main className="container is-fluid">
				{children}
			</main>

			<Footer />
		</>
	)
}

export default Container;
