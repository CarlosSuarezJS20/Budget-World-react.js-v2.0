import React, { useState, useEffect } from 'react';
import classes from './Toolbar.css';
import Logo from '../../Logo/Logo';
import Search from '../Search/Search';
import NavigationItems from '../NavigationItems/NavigationItems';
import { debounce } from '../../Utilities/helpers';

const toolBar = () => {
	const [prevScrollPos, setPrevScrollPos] = useState(0);
	const [visible, setVisible] = useState(true);

	const handleScroll = debounce(() => {
		const currentScrollPos = window.pageYOffset;

		setVisible(
			(prevScrollPos > currentScrollPos &&
				prevScrollPos - currentScrollPos > 70) ||
				currentScrollPos < 10
		);

		setPrevScrollPos(currentScrollPos);
	}, 100);

	const navbarStyles = {
		position: 'fixed',
		top: visible ? 0 : `-100px`,
		left: 0,
		right: 0,
		background: 'transparent',
		zIndex: 100,
		transition: 'top 0.6s',
	};

	useEffect(() => {
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, [prevScrollPos, visible, handleScroll]);

	return (
		<header style={{ ...navbarStyles }}>
			{/* <header className={classes.Navbar}> */}
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
};

export default toolBar;
