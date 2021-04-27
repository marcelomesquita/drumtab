import Link from "next/link";
import { project } from "../../configs/project";

export default function Breadcrumb() {
	return (
		<nav className="breadcrumb is-small" aria-label="breadcrumbs">
			<ul>
				<li><Link href="/"><a>{project.title}</a></Link></li>
				<li className="is-active"><Link href="/"><a aria-current="page">Músicas</a></Link></li>
			</ul>
		</nav>
	)
}
