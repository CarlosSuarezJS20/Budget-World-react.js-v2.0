import React from 'react';
import classes from './ImageHolder.css';

const imageHolder = (props) => {
	return (
		// It isn't perfect. I need to add a img html tag here instead, but as I can't control sizing.
		<div className={classes.ImageContainer}>
			<img src={props.image} className={classes.ItemImage} alt="image_item" />
		</div>
	);
};

export default imageHolder;
