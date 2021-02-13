import React from 'react';
import classes from './ItemFooter.css';

const itemFooter = (props) => (
	<div className={classes.CardFooter}>
		<span className={classes.FooterTags}>{props.itemCategory}</span>
		<span className={classes.FooterTags}>{props.itemCountry}</span>
	</div>
);

export default itemFooter;
