import React, { Component } from 'react';
import classes from './ToolTip.css';
import BackDrop from '../Backdrop/Backdrop';

import { NavLink } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';

class Tooltip extends Component {
	shouldComponentUpdate(nextProps, nextState) {
		return (
			nextProps.show !== this.props.show ||
			nextProps.children !== this.props.children
		);
	}

	updateItemHandler = (id) => {
		console.log(id);
		this.props.onToggleActiveUpdating(id);
	};

	deleteBtnHandler = (id) => {
		this.props.onDeletionItemStart(id);
	};

	render() {
		return (
			<div className={classes.ToolTipHolder}>
				<BackDrop />
				<div className={classes.Info}>
					<div className={classes.TitleHolder}>
						<FontAwesomeIcon
							icon={faTimes}
							className={classes.CloseOptionsModal}
						/>
						<span>options</span>
					</div>
					<NavLink
						to={'/update'}
						className={classes.FooterBtn}
						onClick={() => {
							this.updateItemHandler(this.props.itemId);
						}}
					>
						update
					</NavLink>
					<a
						className={classes.FooterBtn}
						onClick={() => {
							this.deleteBtnHandler(this.props.itemId);
						}}
					>
						delete
					</a>
				</div>
			</div>
		);
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onToggleActiveUpdating: (id) => dispatch(actions.toggleActiveUpdating(id)),
		onDeletionItemStart: (id) => dispatch(actions.deletionItemStart(id)),
	};
};

export default connect(null, mapDispatchToProps)(Tooltip);
