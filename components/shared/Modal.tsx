export default function Modal(props) {
	return (
		<div className="modal is-active">
			<div className="modal-background"></div>
			<div className="modal-content">
				<div className="card">
					<header className="card-header">
						<p className="card-header-title">{props.title}</p>
						<button className="delete m-3" aria-label="close" onClick={props.onClose}></button>
					</header>
					<section className="card-content">
						{props.children}
					</section>
				</div>
			</div>
			<button className="modal-close" onClick={props.onClose}></button>
		</div>
	)
}
