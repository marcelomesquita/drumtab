import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { parseCookies, setCookie } from 'nookies'
import { toast, ToastContainer } from 'react-toastify';
import { analytics } from '../adapters/firebaseClient';
import AuthProvider from '../contexts/Auth';

import 'react-toastify/dist/ReactToastify.css';
import '../assets/styles/global.sass';

export default function DrumTab({ Component, pageProps }) {
	const routers = useRouter();
	const cookies = parseCookies();

	useEffect(() => {
		if (process.env.NEXT_PUBLIC_PRODUCTION) {
      const logEvent = (url) => {
        analytics().setCurrentScreen(url);
        analytics().logEvent('screen_view');
      };

      routers.events.on('routeChangeComplete', logEvent);

      logEvent(window.location.pathname);

      return () => {
        routers.events.off('routeChangeComplete', logEvent);
      };
		}

		if (!cookies?.onceCookies) {
			toast('Utilizamos cookies de acordo com a nosso Termos de Uso e, ao continuar navegando, você concorda com estas condições.', {
				autoClose: false,
				closeOnClick: true,
				onClose: () => setCookie(null, 'onceCookies', true, { path: '/' })
			});
		}
	}, []);

	return (
		<AuthProvider>
			<Head>
				<title>{process.env.NEXT_PUBLIC_TITLE}</title>
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<meta name='application-name' content={process.env.NEXT_PUBLIC_TITLE} />

				<link rel='icon' href='/favicon.ico' />
			</Head>

			<Component {...pageProps} />

			<ToastContainer position='bottom-center' hideProgressBar={true} style={{ width: '75%', textAlign: 'center' }} />
		</AuthProvider>
	);
}
