import Head from "next/head";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { analytics } from "../configs/firebaseClient";
import AuthProvider from "../contexts/Auth";

import "react-toastify/dist/ReactToastify.css";
import "../styles/global.sass";

export default function DrumTab({ Component, pageProps }) {
	useEffect(() => {
		console.log(process.env.NODE_ENV);
		if (process.env.ENV === 'production') {
			analytics();
		}
	}, []);

	return (
		<AuthProvider>
			<Head>
				<meta name="viewport" content="width=device-width, initial-scale=1" />

				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Component {...pageProps} />

			<ToastContainer position="bottom-center" hideProgressBar={true} />
	  	</AuthProvider>
	);
}
