import Head from "next/head";
import { AppProps } from "next/dist/next-server/lib/router/router";
import { Provider } from "next-auth/client";

import "@fortawesome/fontawesome-free/js/all";
import "../styles/global.sass"

export default function DrumTab({ Component, pageProps }: AppProps) {
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
