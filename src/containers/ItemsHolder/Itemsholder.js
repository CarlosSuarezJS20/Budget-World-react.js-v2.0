import React, { Component } from 'react';
import classes from './Itemsholder.css';

import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SingleItem from '../../components/SingleItem/SingleItem';
import CategoriesFilterSection from '../../components/CategoriesSection/CategoriesFilterSection';
import Spinner from '../../components/UI/Spinner/Spinner';
import Modal from '../../components/UI/Modal/Modal';
// redux
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
// Router
import { Redirect } from 'react-router-dom';
import Loader from '../../Loader/Loader';

class ItemsHolder extends Component {
	componentDidMount() {
		this.props.onFetchItems(this.props.token);
	}

	cancelBtnHandler = () => {
		this.props.onCancelDeletion();
	};

	deleteBtnHandler = () => {
		this.props.onDeletingItem(this.props.deleteItmId, this.props.token);
		this.props.onFetchItems();
	};

	render() {
		let items = this.props.items.filter((item) => {
			return item.country.indexOf(this.props.search.trim()) !== -1;
		});

		if (this.props.search && this.props.category) {
			items = this.props.items
				.filter((item) => {
					return item.country.indexOf(this.props.search.trim()) !== -1;
				})
				.filter((item) => item.category === this.props.category);
		} else if (this.props.search) {
			items = this.props.items.filter((item) => {
				return item.country.indexOf(this.props.search.trim()) !== -1;
			});
		} else if (this.props.category) {
			items = this.props.items.filter(
				(item) => item.category === this.props.category
			);
		}

		if (this.props.category === 'ALL' || this.props.seach) {
			items = this.props.items.filter((item) => {
				return item.country.indexOf(this.props.search.trim()) !== -1;
			});
		}

		let filteredItems =
			items.length === 0 && this.props.loading ? (
				<Spinner />
			) : items.length === 0 ? (
				<p className={classes.NotFound}> Nothing Found :( </p>
			) : (
				items.map((item) => {
					return (
						<SingleItem
							key={item.id}
							id={item.id}
							image={item.image}
							title={item.itemName}
							price={item.price}
							description={item.description}
							category={item.category}
							country={item.country}
							userId={item.userId}
						/>
					);
				})
			);

		return !this.props.isAuthenticated ? (
			<Redirect to="/login" />
		) : (
			<section className={classes.Cards}>
				<Loader />
				<Toolbar isAuth={this.props.isAuthenticated} />
				<Modal show={this.props.deleting} clicked={this.cancelBtnHandler}>
					<p>Are you sure you want to delete this item? </p>
					<button className={classes.Btn} onClick={this.cancelBtnHandler}>
						cancel
					</button>
					<button className={classes.Btn} onClick={this.deleteBtnHandler}>
						confirm
					</button>
				</Modal>
				<CategoriesFilterSection />
				<div className={classes.CardsCenter}>{filteredItems}</div>
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
		onDeletionItemStart: () => dispatch(actions.deletionItemStart()),
		onDeletingItem: (id, token) =>
			dispatch(actions.deletingItemInServer(id, token)),
		onCancelDeletion: () => dispatch(actions.deletedItemCancel()),
		onFetchItems: (token) => dispatch(actions.fetchItemsFromServer(token)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemsHolder);
