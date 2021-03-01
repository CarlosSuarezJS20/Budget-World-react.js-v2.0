import React from 'react';
import classes from './ImageHolder.css';

const imageHolder = (props) => {
	return (
		<div className={classes.ImageContainer}>
			<img src={props.image} className={classes.ItemImage} alt="image_item" />
			<p>{props.city}</p>
		</div>
	);
};

export default imageHolder;
