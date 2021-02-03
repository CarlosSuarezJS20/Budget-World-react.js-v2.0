import React, { Component } from 'react';
import classes from './Modal.css';
import BackDrop from '../Backdrop/Backdrop';

class Modal extends Component {
	componentDidUpdate() {
		if (this.props.show) {
			document.body.style.overflowY = 'hidden';
		} else {
			document.body.style.overflowY = 'unset';
		}
	}

	shouldComponentUpdate(nextProps, nextState) {
		return (
			nextProps.show !== this.props.show ||
			nextProps.children !== this.props.children
		);
	}

	render() {
		return (
			<div>
				<BackDrop
					optionsModal={this.props.singleItemOptions}
					show={this.props.show}
					clicked={this.props.clicked}
				/>
				<div
					className={
						this.props.singleItemOptions ? classes.ItemOptions : classes.Modal
					}
					style={{
						transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
						opacity: this.props.show ? '1' : '0',
					}}
				>
					{this.props.children}
				</div>
			</div>
		);
	}
}

export default Modal;
