import React, { Component } from 'react';
import classes from './Itemsholder.css';
import SingleItem from '../../components/SingleItem/SingleItem';
// redux
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';

// need to add spinnere for when fetching items

class ItemsHolder extends Component {
	componentDidMount() {
		this.props.onFetchOrders();
	}

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
			items.length === 0 ? (
				<p className={classes.NotFound}> Nothing Found :( </p>
			) : (
				items.map((item) => {
					return (
						<SingleItem
							key={item.id}
							image={item.image}
							title={item.itemName}
							price={item.price}
							description={item.description}
							category={item.category}
							country={item.country}
						/>
					);
				})
			);

		return (
			<section className={classes.Cards}>
				<div className={classes.CardsCenter}>{filteredItems}</div>
			</section>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		items: state.items,
		search: state.search,
		category: state.category,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onFetchOrders: () => dispatch(actions.fetchItemsFromServer()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemsHolder);
