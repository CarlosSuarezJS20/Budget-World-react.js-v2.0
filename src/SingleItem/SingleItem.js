import React, { Component } from 'react';
import classes from './SingleItem.css';
import ImageHolder from '../UI/ImageHolder/ImageHolder';
import ItemInfo from './ItemInfo/ItemInfo';
import ItemFooter from './ItemFooter/ItemFooter';

class SingleItem extends Component {
	render() {
		return (
			<article className={classes.Card}>
				<ImageHolder />
				<ItemInfo />
				<ItemFooter />
			</article>
		);
	}
}

export default SingleItem;
