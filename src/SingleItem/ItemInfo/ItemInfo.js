import React from 'react';
import classes from './ItemInfo.css';

const itemInfo = (props) => (
	<div className={classes.CardInfo}>
		<div className={classes.CardTitle}>
			<h3>
				Item Name:<span></span>
			</h3>
		</div>
		<div className={classes.CardPrice}>
			<h4>
				Price ($):
				<span></span>
			</h4>
		</div>
		<div className={classes.CardDescription}>
			<h4>
				Description: <span></span>
			</h4>
		</div>
	</div>
);

export default itemInfo;
