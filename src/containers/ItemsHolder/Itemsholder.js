import React, { Component } from 'react';
import classes from './Itemsholder.css';

import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import DeleteConfirmation from '../../components/DeleteConfirmation/DeleteConfirmation';
import Items from '../../components/Items/Items';
import CategoriesFilterSection from '../../components/CategoriesSection/CategoriesFilterSection';
import Spinner from '../../components/UI/Spinner/Spinner';

// redux
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import Loader from '../../components/UI/Loader/Loader';
import ToolTip from '../../components/UI/ToolTip/ToolTip';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSadCry } from '@fortawesome/free-solid-svg-icons';

import axios from '../../axios';
import firebase from '../../firebase';

// Helper Function to delete image from storage server

const deleteItemImagefromStorage = (id) => {
	axios
		.get(`/items/${id}.json`)
		.then((res) => {
			const { imageStorageId } = res.data;
			const storageImageRef = firebase
				.storage()
				.ref(`images/${imageStorageId}`);
			storageImageRef
				.delete()
				.then(() => {
					console.log('image deleted successfully');
				})
				.catch((error) => {
					console.log(`There was this ${error}`);
				});
		})
		.catch((error) => {});
};

class ItemsHolder extends Component {
	componentDidMount() {
		//ensures the page is reloaded at the top when routing
		window.scrollTo(0, 0);
		this.props.onFetchItems(this.props.search, this.props.category);
	}

	cancelBtnHandler = () => {
		this.props.onCancelDeletion();
	};

	deleteBtnHandler = () => {
		deleteItemImagefromStorage(this.props.deleteItmId);
		this.props.onDeletingItem(this.props.deleteItmId, this.props.token);
	};

	render() {
		let items = [...this.props.items];

		// filters per category
		if (this.props.category) {
			items = this.props.items.filter(
				(item) => item.category === this.props.category
			);
		}

		// This is for the spinner on the main div that holds the items. Appears centered

		let classForMainDisplayDiv;

		if (items.length === 0) {
			classForMainDisplayDiv = classes.NotCardsClass;
		} else {
			classForMainDisplayDiv = classes.CardsCenter;
		}

		if (items.length === 0 && this.props.loading) {
			classForMainDisplayDiv = classes.CardsDisplayLoader;
		}

		let filteredItems =
			items.length === 0 && this.props.loading ? (
				<div className={classes.SpinnerHolder}>
					<Spinner />
				</div>
			) : items.length === 0 ? (
				<p className={classes.NotFound}>
					Nothing Found <FontAwesomeIcon icon={faSadCry} />
				</p>
			) : (
				<Items items={items} />
			);
		return (
			<section className={classes.Cards}>
				<Loader />
				<ToolTip />
				<DeleteConfirmation
					deletingShowModal={this.props.deleting}
					cancelled={this.cancelBtnHandler}
					confirmedDeletion={this.deleteBtnHandler}
				/>
				<Toolbar authenticated={this.props.isAuthenticated} />
				<CategoriesFilterSection />
				<div className={classForMainDisplayDiv}>{filteredItems}</div>
			</section>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		deleting: state.itemsR.deleting,
		deleteItmId: state.itemsR.deleteItemId,
		items: state.itemsR.items,
		loading: state.itemsR.loading,
		search: state.filtersR.search,
		searchRef: state.filtersR.searchRef,
		category: state.filtersR.category,
		token: state.authR.token,
		isAuthenticated: state.authR.token != null,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onDeletingItem: (id, token) =>
			dispatch(actions.deletingItemInServer(id, token)),
		onCancelDeletion: () => dispatch(actions.deletedItemCancel()),
		onFetchItems: (search, prevSearchVal, category) =>
			dispatch(actions.fetchItemsFromServer(search, prevSearchVal, category)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemsHolder);
