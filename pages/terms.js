import Head from 'next/head';
import Container from '../components/layout/Container';

export default function TermsPage(props) {
	const pageTitle = 'Termos de Uso';

	return (
		<Container>
			<Head>
				<title>{pageTitle} | {process.env.NEXT_PUBLIC_TITLE}</title>
			</Head>

			<div className='container is-widescreen'>
				<section className='section'>
					<div className='content'>
						<h1>Termos de uso</h1>
						<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam id dapibus ex, ac laoreet lorem. Nunc rutrum ornare convallis. Nulla dictum aliquam tincidunt. Aliquam eleifend, justo eu auctor dictum, nibh metus dictum magna, non pretium nisi metus ac justo. Nullam aliquet, risus id finibus tempor, justo ante pulvinar arcu, vitae viverra enim massa in velit. Vivamus hendrerit efficitur ipsum, quis lacinia lacus lobortis id. Cras vehicula auctor leo eu porta. Sed libero ante, fermentum quis felis ac, molestie lobortis est. Nulla pellentesque sapien nec lectus lobortis imperdiet.</p>
						<p>Vestibulum aliquet non nisl at fringilla. Suspendisse non maximus urna. Mauris porta leo nec pharetra ultrices. Praesent ac felis vitae tortor cursus elementum. Vivamus vel arcu ipsum. Nam dolor nulla, fermentum et purus vitae, rutrum varius lacus. Fusce ut magna tellus. Morbi vestibulum turpis a augue mattis lacinia. Maecenas iaculis felis quis nisi convallis posuere. Etiam non ultricies nulla, nec euismod felis. Nulla tincidunt a metus eu volutpat. Maecenas suscipit molestie tincidunt.</p>
						<p>Donec sollicitudin non risus vel maximus. Sed dictum malesuada tincidunt. Maecenas scelerisque ac eros et pulvinar. Proin at lorem vitae nisi consequat consectetur sit amet sit amet sapien. Maecenas tincidunt ligula vel ante dignissim, sit amet porta libero sodales. Nulla ullamcorper velit ipsum, a congue ipsum consectetur a. Sed ornare magna nec bibendum sagittis. Quisque mi est, fringilla ut faucibus a, ullamcorper ut lectus.</p>
						<p>Sed nec mauris et dui semper tincidunt. Nam dui massa, maximus id tristique a, pulvinar sit amet ante. Morbi interdum hendrerit mauris. Pellentesque ut vulputate leo. Vivamus feugiat scelerisque orci vel ullamcorper. Curabitur dapibus lacus dui, eu finibus sapien viverra in. Curabitur quis felis id velit dictum efficitur in nec metus.</p>
						<p>Sed mattis eleifend ex et hendrerit. Suspendisse potenti. Pellentesque commodo lectus sit amet porttitor varius. Cras sollicitudin lectus elit, in porttitor nulla vehicula in. Aenean felis erat, ullamcorper at gravida non, blandit nec mi. Suspendisse lacinia nisi magna, sit amet egestas urna sollicitudin sit amet. Pellentesque in purus eu nisl congue scelerisque sed placerat justo. Etiam sit amet nunc ac dui congue consectetur. Donec eu est bibendum, venenatis odio a, varius augue. Praesent ornare condimentum felis, at dictum nunc vehicula sed. Suspendisse enim velit, tempus ac porta eget, porta vitae metus. Nunc aliquet neque id orci convallis, vel pulvinar nulla suscipit. Nulla ante nulla, interdum eu sagittis quis, scelerisque in purus.</p>
					</div>
				</section>
			</div>
		</Container>
	);
}
