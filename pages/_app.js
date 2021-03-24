import Head from "next/head";

import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';
import '@fortawesome/fontawesome-free/js/brands';

import 'styles/styles.sass'

function MyApp({ Component, pageProps }) {
	return (
		<>
			<Head>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
        		
				<title>Drumtab</title>
		        
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Component {...pageProps} />
	  	</>
	);
}

export default MyApp;
