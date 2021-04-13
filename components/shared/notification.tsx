import React from "react";

interface Props {
	onClose: any;
}

interface State {
	onClose: any;
}

export default class Notification extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);

		this.state = {
			onClose: props.onClose
		}
	}

	render() {
		return (
			<div className="notification">
				<button className="delete" onClick={this.state.onClose}></button>
				{this.props.children}
			</div>
		)
	}
}
