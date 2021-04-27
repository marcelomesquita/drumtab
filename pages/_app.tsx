import Head from "next/head";
import AuthProvider from "../contexts/Auth";

import "../styles/global.sass"

export default function DrumTab({ Component, pageProps }) {
	return (
		<AuthProvider>
			<Head>
				<meta name="viewport" content="width=device-width, initial-scale=1" />

				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Component {...pageProps} />
	  	</AuthProvider>
	);
}
