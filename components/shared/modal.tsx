import React from "react"

interface Props {
	onClose: any;
	title: string;
}

interface State {
	onClose: any;
	title: string;
}

export default class Modal extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);

		this.state = {
			onClose: props.onClose,
			title: props.title
		}
	}

	render() {
		return (
			<div className="modal is-active">
				<div className="modal-background"></div>
				<div className="modal-content">
					<div className="card">
						<header className="card-header">
							<p className="card-header-title">{this.state.title}</p>
							<button className="delete m-3" aria-label="close" onClick={this.state.onClose}></button>
						</header>
						<section className="card-content">
							{this.props.children}
						</section>
					</div>
				</div>
				<button className="modal-close" onClick={this.state.onClose}></button>
			</div>
		)
	}
}
