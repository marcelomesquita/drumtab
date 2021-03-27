import Breadcrumb from 'components/breadcrumb';
import Footer from './footer';
import Header from './header';

function Container({ children }) {
	return (
		<>
			<Header />

			{children}

			<Footer menu={true} />
		</>
	)
}

export default Container;
