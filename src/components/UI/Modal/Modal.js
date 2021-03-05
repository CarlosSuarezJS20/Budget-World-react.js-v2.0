import React, { Component } from 'react';
import classes from './Modal.css';
import BackDrop from '../Backdrop/Backdrop';

class Modal extends Component {
	shouldComponentUpdate(nextProps, nextState) {
		return (
			nextProps.show !== this.props.show ||
			nextProps.children !== this.props.children
		);
	}

	render() {
		let classesStyles = classes.Modal;

		if (this.props.uploadImageModal) {
			classesStyles = classes.uploadImageModal;
		}

		return (
			<div>
				<BackDrop show={this.props.show} clicked={this.props.clicked} />
				<div
					className={classesStyles}
					style={{
						// transform: this.props.show ? 'translateY(0)' : 'translate(-100vh)',
						display: this.props.show ? 'block' : 'none',
					}}
				>
					{this.props.children}
				</div>
			</div>
		);
	}
}

export default Modal;
