import React from 'react';
import classes from './ItemFooter.css';

const itemFooter = (props) => {
	return (
		<div className={classes.CardFooter}>
			<div className={classes.FooterInfo}>
				<span></span>
				<span></span>
			</div>
			<div className={classes.CardBtns}>
				<button className={classes.FooterBtn}>edit</button>
				<button className={classes.FooterBtn}>delete</button>
			</div>
		</div>
	);
};

export default itemFooter;
