import React from 'react';
import classes from './ItemInfo.css';

const itemInfo = (props) => {
	return (
		<div className={classes.CardInfo}>
			<div className={classes.CardTitle}>
				<h3 className={classes.ItemTitle}>
					Item Name:<span>{props.itemName}</span>
				</h3>
			</div>
			<div className={classes.CardPrice}>
				<h4>
					Price:
					<span>{`£${props.itemPrice}`}</span>
				</h4>
			</div>
			<div className={classes.CardDescription}>
				<h4>
					Description: <span>{props.itemDescription}</span>
				</h4>
			</div>
		</div>
	);
};

export default itemInfo;
