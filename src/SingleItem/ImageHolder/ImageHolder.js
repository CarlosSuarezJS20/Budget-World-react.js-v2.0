import React from 'react';
import classes from './ImageHolder.css';

const imageHolder = (props) => {
	console.log(props.image);
	return (
		<div className={classes.ImageContainer}>
			<img src={props.image} alt="item-img" />
		</div>
	);
};

export default imageHolder;
