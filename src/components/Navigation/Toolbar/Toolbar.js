import React from 'react';
import classes from './Toolbar.css';
import Logo from '../../Logo/Logo';
import Search from '../Search/Search';
import NavigationItems from '../NavigationItems/NavigationItems';

const toolBar = () => (
	<header className={classes.Navbar}>
		<div className={classes.NavbarItemsHolder}>
			<div className={classes.NavbarLogoHolder}>
				<Logo LogoNavbar />
			</div>
			<div className={classes.SearchInputHolder}>
				<Search />
			</div>
			<nav className={classes.NavItemsHolder}>
				<NavigationItems />
			</nav>
		</div>
	</header>
);

export default toolBar;
