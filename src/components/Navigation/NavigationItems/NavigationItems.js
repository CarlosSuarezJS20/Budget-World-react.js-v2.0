import React from 'react';
import classes from './NavigationItems.css';
import NavigationItem from '../NavigationItem/NavigationItem';

const navigationItems = () => (
	<ul className={classes.NavigationItems}>
		<NavigationItem link="/add-new" exact>
			Add New
		</NavigationItem>
		{/* <NavigationItem link="/plan-your-trip">Plan Trip</NavigationItem> */}
		<NavigationItem link="/Auth">Authentication</NavigationItem>
	</ul>
);

export default navigationItems;
