import React, { Component } from 'react';
import classes from './Layout.css';
import Toolbar from '../../Navigation/Toolbar/Toolbar';
import Modal from '../../UI/Modal/Modal';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';

// Move modal inner code into its own component

class LayOut extends Component {
	cancelBtnHandler = () => {
		this.props.onCancelDeletion();
	};

	deleteBtnHandler = () => {
		this.props.onDeletingItem(this.props.deleteItmId);
		this.props.onFetchItems();
	};

	render() {
		return (
			<React.Fragment>
				<Toolbar />
				<Modal show={this.props.deleting} clicked={this.cancelBtnHandler}>
					<p>Are you sure you want to delete this item? </p>
					<button className={classes.Btn} onClick={this.cancelBtnHandler}>
						cancel
					</button>
					<button className={classes.Btn} onClick={this.deleteBtnHandler}>
						confirm
					</button>
				</Modal>
				<main className={classes.Layout}>{this.props.children}</main>
			</React.Fragment>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		deleting: state.deleting,
		deleteItmId: state.deleteItemId,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onToggleActiveUpdating: (id) => dispatch(actions.toggleActiveUpdating(id)),
		onDeletionItemStart: () => dispatch(actions.deletionItemStart()),
		onDeletingItem: (id) => dispatch(actions.deletingItemInServer(id)),
		onFetchItems: () => dispatch(actions.fetchItemsFromServer()),
		onCancelDeletion: () => dispatch(actions.deletedItemCancel()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(LayOut);
