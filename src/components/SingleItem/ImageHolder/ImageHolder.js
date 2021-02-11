import React from 'react';
import classes from './ImageHolder.css';

const imageHolder = (props) => {
	return (
		<div
			className={classes.ImageContainer}
			style={{ background: `url(${props.image}) center/cover no-repeat` }}
		></div>
	);
};

export default imageHolder;
