import React, { Component } from 'react';
import classes from './Itemsholder.css';
import SingleItem from '../../components/SingleItem/SingleItem';
import axios from '../../axios';
// redux
import { connect } from 'react-redux';

class ItemsHolder extends Component {
	state = {
		items: [],
	};

	componentDidMount() {
		axios
			.get('/items.json')
			.then((res) => {
				const fetchedItems = [];
				for (let item in res.data) {
					fetchedItems.push({
						...res.data[item],
						id: item,
					});
					console.log(fetchedItems);
				}
				this.setState({ items: fetchedItems });
			})
			.catch((error) => {
				console.log(error);
			});
	}

	render() {
		return (
			<section className={classes.Cards}>
				<div className={classes.CardsCenter}>
					{this.props.items.map((item) => {
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
					})}
				</div>
			</section>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		items: state.items,
	};
};

export default connect(mapStateToProps)(ItemsHolder);
