import React, { Component } from 'react';
import classes from './ToolTip.css';
import BackDrop from '../Backdrop/Backdrop';

class Tooltip extends Component {
	shouldComponentUpdate(nextProps, nextState) {
		return (
			nextProps.show !== this.props.show ||
			nextProps.children !== this.props.children
		);
	}

	render() {
		return (
			<div className={classes.ToolTipHolder}>
				<BackDrop />
				<div className={classes.Info}>{this.props.children}</div>
			</div>
		);
	}
}

export default Tooltip;
