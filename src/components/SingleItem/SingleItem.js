import React from 'react';
import classes from './SingleItem.css';
import ImageHolder from './ImageHolder/ImageHolder';
import ItemInfo from './ItemInfo/ItemInfo';
import ItemFooter from './ItemFooter/ItemFooter';

const singleItem = (props) => {
	return (
		<article className={classes.Card}>
			<ImageHolder image={props.image} />
			<ItemInfo
				itemName={props.title}
				itemPrice={props.price}
				itemDescription={props.description}
			/>
			<ItemFooter itemCategory={props.category} itemCountry={props.country} />
		</article>
	);
};

export default singleItem;
