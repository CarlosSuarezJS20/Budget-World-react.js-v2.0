import React from 'react';
import classes from './ImageHolder.css';

const imageHolder = (props) => {
	let imageStyling = classes.ItemImage;
	let containerStyling = classes.ImageContainer;
	if (props.profileItems) {
		imageStyling = classes.ItemImageForProfile;
		containerStyling = classes.ImageContainerForProfile;
	}
	return (
		<div className={containerStyling}>
			<img src={props.image} className={imageStyling} alt="image_item" />
			<p className={classes.CityTitle}>{props.city}</p>
		</div>
	);
};

export default imageHolder;
