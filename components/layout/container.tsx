import Footer from "./footer";
import Header from "./header";

function Container({ children }) {
	return (
		<>
			<Header />

			{children}

			<Footer />
		</>
	)
}

export default Container;
