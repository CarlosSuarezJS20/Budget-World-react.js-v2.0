import React from 'react';
import classes from './NavigationItems.css';
import NavigationItem from '../NavigationItem/NavigationItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const navigationItems = () => (
	<ul className={classes.NavigationItems}>
		<NavigationItem link="/add-new" exact>
			<FontAwesomeIcon icon={faPlusCircle} className={classes.AddNewButton} />
		</NavigationItem>
		<NavigationItem link="/logout">
			<FontAwesomeIcon icon={faSignOutAlt} className={classes.AddNewButton} />
		</NavigationItem>
	</ul>
);

export default navigationItems;
