import React from 'react';
import classes from './Toolbar.css';
import Logo from '../../Logo/Logo';
import Search from '../Search/Search';
import NavigationItems from '../NavigationItems/NavigationItems';

const toolBar = () => (
	<header className={classes.Navbar}>
		<Logo />
		<Search />
		<nav>
			<NavigationItems />
		</nav>
	</header>
);

export default toolBar;
