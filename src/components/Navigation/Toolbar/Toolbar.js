import React from 'react';
import classes from './Toolbar.css';
import Logo from '../../Logo/Logo';
import Search from '../Search/Search';
import NavigationItems from '../NavigationItems/NavigationItems';

const toolBar = (props) => (
	<header className={classes.Navbar}>
		<Logo />
		{props.isAuth ? (
			<Search />
		) : (
			<div className={classes.Title}>Budget World</div>
		)}
		<nav>
			<NavigationItems isAuthenticated={props.isAuth} />
		</nav>
	</header>
);

export default toolBar;
