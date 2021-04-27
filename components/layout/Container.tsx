import Footer from "./Footer";
import Header from "./Header";

export default function Container({ children }) {
	return (
		<>
			<Header />

			{children}

			<Footer />
		</>
	)
}
