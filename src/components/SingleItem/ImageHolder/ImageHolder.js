import React from 'react';
import classes from './ImageHolder.css';

const imageHolder = (props) => {
	return (
		<div className={classes.ImageContainer}>
			<img className={classes.Img} src={props.image} alt="item-img" />
		</div>
	);
};

export default imageHolder;
