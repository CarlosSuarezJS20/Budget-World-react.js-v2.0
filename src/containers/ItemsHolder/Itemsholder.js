import React from 'react';
import classes from './Itemsholder.css';
import SingleItem from '../../SingleItem/SingleItem';

const itemsHolder = (props) => {
	return (
		<section className={classes.Cards}>
			<div className={classes.CardsCenter}>
				<SingleItem />
				<SingleItem />
				<SingleItem />
				<SingleItem />
				<SingleItem />
				<SingleItem />
			</div>
		</section>
	);
};

export default itemsHolder;
