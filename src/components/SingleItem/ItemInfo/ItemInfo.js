import React from 'react';
import classes from './ItemInfo.css';

const itemInfo = (props) => {
	return (
		<div className={classes.CardInfo}>
			<div className={classes.CardTitle}>
				<h2>{props.itemName}</h2>
			</div>
			<div className={classes.CardPrice}>
				<h3>{`£ ${props.itemPrice}`}</h3>
			</div>
			<div className={classes.CardDescription}>
				<h3>{props.itemDescription}</h3>
			</div>
		</div>
	);
};

export default itemInfo;
