export default function Pagination(props) {
	const path = props.path;
	const currentPage = props.currentPage ? props.currentPage : 1;
	const itemsPerPage = props.itemsPerPage ? props.currentPage : 10;
	const tolerancePage = props.tolerancePage ? props.tolerancePage : 3;
	const total = props.total;
	const showPages = props.showPages ? props.showPages : true;
	const showPrevNext = props.showPrevNext ? props.showPrevNext : true;

	return (
		<nav className='pagination' role='navigation' aria-label='pagination'>
			<a className='pagination-previous'>Previous</a>
			<a className='pagination-next'>Next</a>
			<ul className='pagination-list'>
				<li>
					<a className='pagination-link' aria-label='Goto page 1'>
						1
					</a>
				</li>
				<li>
					<span className='pagination-ellipsis'>&hellip;</span>
				</li>
				<li>
					<a className='pagination-link' aria-label='Goto page 45'>
						45
					</a>
				</li>
				<li>
					<a className='pagination-link is-current' aria-label='Page 46' aria-current='page'>
						46
					</a>
				</li>
				<li>
					<a className='pagination-link' aria-label='Goto page 47'>
						47
					</a>
				</li>
				<li>
					<span className='pagination-ellipsis'>&hellip;</span>
				</li>
				<li>
					<a className='pagination-link' aria-label='Goto page 86'>
						86
					</a>
				</li>
			</ul>
		</nav>
	);
}
