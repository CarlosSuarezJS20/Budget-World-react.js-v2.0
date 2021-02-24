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

class ItemsHolder extends Component {
	componentDidMount() {
		//ensures the page is reloaded at the top when routing
		window.scrollTo(0, 0);
		this.props.onFetchItems();
	}

	cancelBtnHandler = () => {
		this.props.onCancelDeletion();
	};

	deleteBtnHandler = () => {
		this.props.onDeletingItem(this.props.deleteItmId, this.props.token);
	};

	render() {
		//Filters
		let items = this.props.items.filter((item) => {
			return item.country.indexOf(this.props.search.trim()) !== -1;
		});

		if (this.props.search && this.props.category) {
			items = this.props.items
				.filter((item) => {
					return item.country.indexOf(this.props.search.trim()) !== -1;
				})
				.filter((item) => item.category === this.props.category);
		}

		if (this.props.search) {
			items = this.props.items.filter((item) => {
				return item.country.indexOf(this.props.search.trim()) !== -1;
			});
		}

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
		search: state.itemsR.search,
		category: state.itemsR.category,
		token: state.authR.token,
		isAuthenticated: state.authR.token != null,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onDeletingItem: (id, token) =>
			dispatch(actions.deletingItemInServer(id, token)),
		onCancelDeletion: () => dispatch(actions.deletedItemCancel()),
		onFetchItems: (token) => dispatch(actions.fetchItemsFromServer(token)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemsHolder);
