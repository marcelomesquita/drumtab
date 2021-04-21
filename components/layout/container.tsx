import Footer from "./footer";
import Header from "./header";

export default function Container({ children }) {
	return (
		<>
			<Header />

			{children}

			<Footer />
		</>
	)
}
