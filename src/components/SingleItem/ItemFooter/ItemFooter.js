import React, { Component } from 'react';
import classes from './ItemFooter.css';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';
import { NavLink } from 'react-router-dom';
import Modal from '../../UI/Modal/Modal';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

class ItemFooter extends Component {
	updateItemHandler = (id) => {
		this.props.onToggleActiveUpdating(id);
	};

	deleteBtnHandler = (id) => {
		this.props.onDeletionItemStart(id);
		this.props.hideOptionsModal();
	};

	render() {
		let buttons = null;

		if (this.props.userId === this.props.itemUserId) {
			buttons = (
				<Modal
					show={this.props.showOptionsModal}
					singleItemOptions
					clicked={this.props.hideOptionsModal}
				>
					<div className={classes.TitleHolder}>
						<FontAwesomeIcon
							icon={faTimes}
							className={classes.CloseOptionsModal}
							onClick={this.props.hideOptionsModal}
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
				</Modal>
			);
		}

		return (
			<div className={classes.CardFooter}>
				<span className={classes.FooterTags}>{this.props.itemCategory}</span>
				<span className={classes.FooterTags}>{this.props.itemCountry}</span>
				{buttons}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		userId: state.authR.userId,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onToggleActiveUpdating: (id) => dispatch(actions.toggleActiveUpdating(id)),
		onDeletionItemStart: (id) => dispatch(actions.deletionItemStart(id)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemFooter);
