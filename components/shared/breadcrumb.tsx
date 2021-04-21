import Link from "next/link";
import { PROJECT } from "../../project";

export default function Breadcrumb() {
	return (
		<nav className="breadcrumb is-small" aria-label="breadcrumbs">
			<ul>
				<li><Link href="/"><a>{PROJECT.TITLE}</a></Link></li>
				<li className="is-active"><Link href="/"><a aria-current="page">Músicas</a></Link></li>
			</ul>
		</nav>
	)
}
