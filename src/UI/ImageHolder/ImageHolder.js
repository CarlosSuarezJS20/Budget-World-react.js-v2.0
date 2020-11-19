import React from 'react';
import classes from './ImageHolder.css';

const imageHolder = (props) => (
	<div className={classes.ImageContainer}>
		<img src={props.imageURL} alt="item-img" />
	</div>
);

export default imageHolder;
