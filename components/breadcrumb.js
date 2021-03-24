import Link from "next/link";

function Breadcrumb() {
	return (
		<nav className="breadcrumb is-small" aria-label="breadcrumbs">
			<ul>
				<li><Link href="/"><a>Drumtab</a></Link></li>
				<li className="is-active"><Link href="/"><a aria-current="page">Músicas</a></Link></li>
			</ul>
		</nav>
	)
}

export default Breadcrumb;
