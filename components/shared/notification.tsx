export default function Notificatio(props) {
	return (
		<div className="notification">
			<button className="delete" onClick={props.onClose}></button>
			{props.children}
		</div>
	)
}
