import Head from 'next/head';
import Container from '../components/layout/Container';

export default function TermsPage(props) {
	const pageTitle = 'Termos de Uso';

	return (
		<Container>
			<Head>
				<title>{pageTitle} | {process.env.NEXT_PUBLIC_TITLE}</title>
				<meta property='description' content='Confira a política de uso do site.' key='description' />
			</Head>

			<div className='container is-widescreen'>
				<section className='section'>
					<div className='content'>
						<h1 className='title is-1'>{pageTitle}</h1>
						<p>Os serviços do _____ são fornecidos pela pessoa jurídica OU física com a seguinte Razão Social/nome: ____, com nome fantasia ___, inscrito no CNPJ/CPF sob o nº ___, titular da propriedade intelectual sobre software, website, aplicativos, conteúdos e demais ativos relacionados à plataforma ______.</p>
						<h2 className='title is-2'>1. Do objeto</h2>
						<p>A plataforma visa licenciar o uso de seu software, website, aplicativos e demais ativos de propriedade intelectual, fornecendo ferramentas para auxiliar e dinamizar o dia a dia dos seus usuários.</p>
						<p>A plataforma caracteriza-se pela prestação do seguinte serviço: _____.</p>
						<p>A plataforma realiza a venda à distância por meio eletrônico dos seguintes produtos ou serviços: _______.</p>
						<h2 className='title is-2'>2. Da aceitação</h2> 
						<p>O presente Termo estabelece obrigações contratadas de livre e espontânea vontade, por tempo indeterminado, entre a plataforma e as pessoas físicas ou jurídicas, usuárias do OU site OU aplicativo.</p> 
						<p>Ao utilizar a plataforma o usuário aceita integralmente as presentes normas e compromete-se a observá-las, sob o risco de aplicação das penalidade cabíveis.</p> 
						<p>A aceitação do presente instrumento é imprescindível para o acesso e para a utilização de quaisquer serviços fornecidos pela empresa. Caso não concorde com as disposições deste instrumento, o usuário não deve utilizá-los.</p> 
						<h2 className='title is-2'>3. Do acesso dos usuários</h2>
						<p>Serão utilizadas todas as soluções técnicas à disposição do responsável pela plataforma para permitir o acesso ao serviço 24 (vinte e quatro) horas por dia, 7 (sete) dias por semana. No entanto, a navegação na plataforma ou em alguma de suas páginas poderá ser interrompida, limitada ou suspensa para atualizações, modificações ou qualquer ação necessária ao seu bom funcionamento. </p> 
						<h2 className='title is-2'>4. Do cadastro</h2>
						<p>O acesso às funcionalidades da plataforma exigirá a realização de um cadastro prévio e, a depender dos serviços ou produtos escolhidos, o pagamento de determinado valor. </p>
						<p>Ao se cadastrar o usuário deverá informar dados completos, recentes e válidos, sendo de sua exclusiva responsabilidade manter referidos dados atualizados, bem como o usuário se compromete com a veracidade dos dados fornecidos.</p> 
						<p>O usuário se compromete a não informar seus dados cadastrais e/ou de acesso à plataforma a terceiros, responsabilizando-se integralmente pelo uso que deles seja feito.</p> 
						<p>Menores de 18 anos e aqueles que não possuírem plena capacidade civil deverão obter previamente o consentimento expresso de seus responsáveis legais para utilização da plataforma e dos serviços ou produtos, sendo de responsabilidade exclusiva dos mesmos o eventual acesso por menores de idade e por aqueles que não possuem plena capacidade civil sem a prévia autorização.</p> 
						<p>Mediante a realização do cadastro o usuário declara e garante expressamente ser plenamente capaz, podendo exercer e usufruir livremente dos serviços e produtos. </p> 
						<p>O usuário deverá fornecer um endereço de e-mail válido, através do qual o site realizará todas comunicações necessárias. </p> 
						<p>Após a confirmação do cadastro, o usuário possuirá um login e uma senha pessoal, a qual assegura ao usuário o acesso individual à mesma. Desta forma, compete ao usuário exclusivamente a manutenção de referida senha de maneira confidencial e segura, evitando o acesso indevido às informações pessoais. </p> 
						<p>Toda e qualquer atividade realizada com o uso da senha será de responsabilidade do usuário, que deverá informar prontamente a plataforma em caso de uso indevido da respectiva senha.</p> 
						<p>Não será permitido ceder, vender, alugar ou transferir, de qualquer forma, a conta, que é pessoal e intransferível.</p> 
						<p>Caberá ao usuário assegurar que o seu equipamento seja compatível com as características técnicas que viabilize a utilização da plataforma e dos serviços ou produtos.</p> 
						<p>O usuário poderá, a qualquer tempo, requerer o cancelamento de seu cadastro junto ao site __ OU aplicativo ___. O seu descadastramento será realizado o mais rapidamente possível, desde que não sejam verificados débitos em aberto.</p> 
						<p>O usuário, ao aceitar os Termos e Política de Privacidade, autoriza expressamente a plataforma a coletar, usar, armazenar, tratar, ceder ou utilizar as informações derivadas do uso dos serviços, do site e quaisquer plataformas, incluindo todas as informações preenchidas pelo usuário no momento em que realizar ou atualizar seu cadastro, além de outras expressamente descritas na Política de Privacidade que deverá ser autorizada pelo usuário.</p> 
						<h2 className='title is-2'>5. Dos serviços ou produtos</h2> 
						<p>A plataforma poderá disponibilizar para o usuário um conjunto específico de funcionalidades e ferramentas para otimizar o uso dos serviços e produtos.</p>
						<p>Na plataforma os serviços ou produtos oferecidos estão descritos e apresentados com o maior grau de exatidão, contendo informações sobre suas características, qualidades, quantidades, composição, preço, garantia, prazos de validade e origem, entre outros dados, bem como sobre os riscos que apresentam à saúde e segurança do usuário.</p>
						<p>Antes de finalizar a compra sobre determinado produto ou serviço, o usuário deverá se informar sobre as suas especificações e sobre a sua destinação. </p>
						<h2 className='title is-2'>6. Dos preços</h2>
						<p>A plataforma se reserva no direito de reajustar unilateralmente, a qualquer tempo, os valores dos serviços ou produtos sem consulta ou anuência prévia do usuário.</p>
						<p>Os valores aplicadas são aqueles que estão em vigor no momento do pedido.</p>
						<p>Os preços são indicados em reais e não incluem as taxas de entrega, as quais são especificadas à parte e são informadas ao usuário antes da finalização do pedido. </p>
						<p>Na contratação de determinado serviço ou produto, a plataforma poderá solicitar as informações financeiras do usuário, como CPF, endereço de cobrança e dados de cartões. Ao inserir referidos dados o usuário concorda que sejam cobrados, de acordo com a forma de pagamento que venha a ser escolhida, os preços então vigentes e informados quando da contratação. Referidos dados financeiros poderão ser armazenadas para facilitar acessos e contratações futuras.</p>
						<p>A contratação dos serviços será renovada automaticamente pela plataforma, independentemente de comunicação ao usuário, mediante cobrança periódica da mesma forma de pagamento indicada pelo usuário quando da contratação do serviço.</p>
						<h2 className='title is-2'>7. Do cancelamento</h2>
						<p>O usuário poderá cancelar a contratação dos serviços de acordo com os termos que forem definidos no momento de sua contratação. Ainda, o usuário também poderá cancelar os serviços em até 7 (sete) dias após a contratação, mediante contato com o ____, de acordo com o <a href='https://www.jusbrasil.com.br/legislacao/91585/código-de-defesa-do-consumidor-lei-8078-90' rel='10608773' title='Lei nº 8.078, de 11 de setembro de 1990.'>Código de Defesa do Consumidor</a> (Lei no. <a href='https://www.jusbrasil.com.br/legislacao/91585/código-de-defesa-do-consumidor-lei-8078-90' rel='10608773' title='Lei nº 8.078, de 11 de setembro de 1990.'>8.078</a>/90).</p>
						<p>O serviço poderá ser cancelado por:</p>
						<p>a) parte do usuário: nessas condições os serviços somente cessarão quando concluído o ciclo vigente ao tempo do cancelamento;</p>
						<p>b) violação dos Termos de Uso: os serviços serão cessados imediatamente.</p>
						<h2 className='title is-2'>8. Da troca e devolução</h2>
						<p>A política de troca e devoluções da plataforma é regida conforme o <a href='https://www.jusbrasil.com.br/legislacao/91585/código-de-defesa-do-consumidor-lei-8078-90' rel='10608773' title='Lei nº 8.078, de 11 de setembro de 1990.'>Código de Defesa do Consumidor</a> (Lei nº <a href='https://www.jusbrasil.com.br/legislacao/91585/código-de-defesa-do-consumidor-lei-8078-90' rel='10608773' title='Lei nº 8.078, de 11 de setembro de 1990.'>8.078</a>/90).</p>
						<p>A troca e/ou devolução do produto poderá ocorrer por:</p>
						<p>a) direito de arrependimento;</p>
						<p>b) vício do produto.</p>
						<p>Em caso de arrependimento, o usuário poderá devolver o produto em até 7 (sete) dias após o seu recebimento, mediante contato com o ____, de acordo com o <a href='https://www.jusbrasil.com.br/legislacao/91585/código-de-defesa-do-consumidor-lei-8078-90' rel='10608773' title='Lei nº 8.078, de 11 de setembro de 1990.'>Código de Defesa do Consumidor</a> (Lei nº <a href='https://www.jusbrasil.com.br/legislacao/91585/código-de-defesa-do-consumidor-lei-8078-90' rel='10608773' title='Lei nº 8.078, de 11 de setembro de 1990.'>8.078</a>/90).</p>
						<p>Em caso de vício do produto, deverá ser verificado vícios de qualidade ou quantidade que tornem o produto impróprios ou inadequados ao consumo a que se destinam ou que lhes diminuam o valor. Ainda, poderão ser trocados ou devolvidos os produtos ou serviços que apresentam disparidade com as indicações constantes na plataforma no momento da compra ou na embalagem, respeitando as variações decorrentes de sua natureza.</p>
						<p>O usuário deverá entrar em contato com o ____ tão logo constate o vício. Se, no prazo máximo de 30 (trinta) dias, não for possível resolver o vício ou, independentemente deste prazo, a substituição das partes viciadas puder comprometer a qualidade ou características do produto ou serviço, diminuir-lhe o valor ou se tratar de produto ou serviço essencial, o usuário poderá optar pela substituição do produto por outro da mesma espécie ou pela reexecução do serviço, pela devolução das quantias pagas ou pelo abatimento proporcional do preço.</p>
						<h2 className='title is-2'>9. Do suporte</h2>
						<p>Em caso de qualquer dúvida, sugestão ou problema com a utilização da plataforma, o usuário poderá entrar em contato com o suporte, através do email ___ OU telefone ____.</p>
						<p>Estes serviços de atendimento ao usuário estarão disponíveis nos seguintes dias e horários: ____.</p>
						<h2 className='title is-2'>10. Das responsabilidades</h2>
						<p>É de responsabilidade do usuário:</p>
						<p>a) defeitos ou vícios técnicos originados no próprio sistema do usuário;</p>
						<p>b) a correta utilização da plataforma, dos serviços ou produtos oferecidos, prezando pela boa convivência, pelo respeito e cordialidade entre os usuários;</p>
						<p>c) pelo cumprimento e respeito ao conjunto de regras disposto nesse Termo de Condições Geral de Uso, na respectiva Política de Privacidade e na legislação nacional e internacional;</p>
						<p>d) pela proteção aos dados de acesso à sua conta/perfil (login e senha).</p>
						<p>É de responsabilidade da plataforma ______:</p>
						<p>a) indicar as características do serviço ou produto;</p>
						<p>b) os defeitos e vícios encontrados no serviço ou produto oferecido desde que lhe tenha dado causa;</p>
						<p>c) as informações que foram por ele divulgadas, sendo que os comentários ou informações divulgadas por usuários são de inteira responsabilidade dos próprios usuários;</p>
						<p>d) os conteúdos ou atividades ilícitas praticadas através da sua plataforma.</p>
						<p>A plataforma não se responsabiliza por links externos contidos em seu sistema que possam redirecionar o usuário à ambiente externo a sua rede. </p>
						<p>Não poderão ser incluídos links externos ou páginas que sirvam para fins comerciais ou publicitários ou quaisquer informações ilícitas, violentas, polêmicas, pornográficas, xenofóbicas, discriminatórias ou ofensivas.</p>
						<h2 className='title is-2'>11. Dos <a href='https://www.jusbrasil.com.br/legislacao/92175/lei-de-direitos-autorais-lei-9610-98' rel='10631003' title='Lei nº 9.610, de 19 de fevereiro de 1998.'>direitos autorais</a></h2>
						<p>O presente Termo de Uso concede aos usuários uma licença não exclusiva, não transferível e não sublicenciável, para acessar e fazer uso da plataforma e dos serviços e produtos por ela disponibilizados.</p>
						<p>A estrutura do site ou aplicativo, as marcas, logotipos, nomes comerciais, layouts, gráficos e design de interface, imagens, ilustrações, fotografias, apresentações, vídeos, conteúdos escritos e de som e áudio, programas de computador, banco de dados, arquivos de transmissão e quaisquer outras informações e direitos de propriedade intelectual da razão social ___, observados os termos da <a href='https://www.jusbrasil.com.br/legislacao/91774/código-de-propriedade-industrial-lei-9279-96' rel='10599419' title='Lei nº 9.279, de 14 de maio de 1996.'>Lei da Propriedade Industrial</a> (Lei nº <a href='https://www.jusbrasil.com.br/legislacao/91774/código-de-propriedade-industrial-lei-9279-96' rel='10599419' title='Lei nº 9.279, de 14 de maio de 1996.'>9.279</a>/96), <a href='https://www.jusbrasil.com.br/legislacao/92175/lei-de-direitos-autorais-lei-9610-98' rel='10631003' title='Lei nº 9.610, de 19 de fevereiro de 1998.'>Lei de Direitos Autorais</a> (Lei nº <a href='https://www.jusbrasil.com.br/legislacao/92175/lei-de-direitos-autorais-lei-9610-98' rel='10631003,15574451' title='Lei nº 9.610, de 19 de fevereiro de 1998.'>9.610</a>/98) e <a href='https://www.jusbrasil.com.br/legislacao/109879/lei-do-software-lei-9609-98' rel='11723358' title='Lei nº 9.609 , de 19 de fevereiro de 1998.'>Lei do Software</a> (Lei nº <a href='https://www.jusbrasil.com.br/legislacao/109879/lei-do-software-lei-9609-98' rel='11723358,15574578' title='Lei nº 9.609 , de 19 de fevereiro de 1998.'>9.609</a>/98), estão devidamente reservados.</p>
						<p>Este Termos de Uso não cede ou transfere ao usuário qualquer direito, de modo que o acesso não gera qualquer direito de propriedade intelectual ao usuário, exceto pela licença limitada ora concedida.</p>
						<p>O uso da plataforma pelo usuário é pessoal, individual e intransferível, sendo vedado qualquer uso não autorizado, comercial ou não-comercial. Tais usos consistirão em violação dos direitos de propriedade intelectual da razão social ___, puníveis nos termos da legislação aplicável.</p>
						<h2 className='title is-2'>12. Das sanções</h2>
						<p>Sem prejuízo das demais medidas legais cabíveis, a razão social __ poderá, a qualquer momento, advertir, suspender ou cancelar a conta do usuário:</p>
						<p>a) que violar qualquer dispositivo do presente Termo;</p>
						<p>b) que descumprir os seus deveres de usuário;</p>
						<p>c) que tiver qualquer comportamento fraudulento, doloso ou que ofenda a terceiros.</p>
						<h2 className='title is-2'>13. Da rescisão</h2>
						<p>A não observância das obrigações pactuadas neste Termo de Uso ou da legislação aplicável poderá, sem prévio aviso, ensejar a imediata rescisão unilateral por parte da razão social ____ e o bloqueio de todos os serviços prestados ao usuário.</p>
						<h2 className='title is-2'>14. Das alterações</h2>
						<p>Os itens descritos no presente instrumento poderão sofrer alterações, unilateralmente e a qualquer tempo, por parte de ___, para adequar ou modificar os serviços, bem como para atender novas exigências legais. As alterações serão veiculadas OU pelo site ____ OU pelo aplicativo ___ e o usuário poderá optar por aceitar o novo conteúdo ou por cancelar o uso dos serviços, caso seja assinante de algum serviço.</p>
						<p>Os serviços oferecidos podem, a qualquer tempo e unilateralmente, e sem qualquer aviso prévio, ser deixados de fornecer, alterados em suas características, bem como restringido para o uso ou acesso.</p>
						<h2 className='title is-2'>15. Da política de privacidade</h2>
						<p>Além do presente Termo, o usuário deverá consentir com as disposições contidas na respectiva Política de Privacidade a ser apresentada a todos os interessados dentro da interface da plataforma.</p>
						<h2 className='title is-2'>16. Do foro</h2>
						<p>Para a solução de controvérsias decorrentes do presente instrumento será aplicado integralmente o Direito brasileiro.</p>
						<p>Os eventuais litígios deverão ser apresentados no foro da comarca em que se encontra a sede da empresa.</p>
					</div>
				</section>
			</div>
		</Container>
	);
}
