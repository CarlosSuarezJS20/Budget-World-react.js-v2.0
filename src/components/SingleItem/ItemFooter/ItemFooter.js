import React, { Component } from 'react';
import classes from './ItemFooter.css';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';
import { NavLink } from 'react-router-dom';

class ItemFooter extends Component {
	updateItemHandler = (id) => {
		this.props.onToggleActiveUpdating(id);
	};

	deleteBtnHandler = (id) => {
		this.props.onDeletionItemStart(id);
	};

	render() {
		let buttons = null;

		if (this.props.userId === this.props.itemUserId) {
			buttons = (
				<div className={classes.CardBtns}>
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
			);
		}

		return (
			<div className={classes.CardFooter}>
				<div className={classes.FooterInfo}>
					<span>{this.props.itemCategory}</span>
					<span>{this.props.itemCountry}</span>
				</div>
				{buttons}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		userId: state.userId,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onToggleActiveUpdating: (id) => dispatch(actions.toggleActiveUpdating(id)),
		onDeletionItemStart: (id) => dispatch(actions.deletionItemStart(id)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemFooter);
