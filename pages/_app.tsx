import Head from "next/head";
import { AppProps } from "next/dist/next-server/lib/router/router";
import { Provider } from "next-auth/client";

import "@fortawesome/fontawesome-free/js/fontawesome";
import "@fortawesome/fontawesome-free/js/solid";
import "@fortawesome/fontawesome-free/js/regular";
import "@fortawesome/fontawesome-free/js/brands";

import "../styles/global.sass"

function DrumTab({ Component, pageProps }: AppProps): JSX.Element {
	return (
		<Provider session={pageProps.session}>
			<Head>
				<meta name="viewport" content="width=device-width, initial-scale=1" />

				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Component {...pageProps} />
	  	</Provider>
	);
}

export default DrumTab;
