import React, { useState, useEffect } from 'react';
import classes from './Toolbar.css';
import Logo from '../../Logo/Logo';
import Search from '../Search/Search';
import NavigationItems from '../NavigationItems/NavigationItems';
import { debounce } from '../../Utilities/helpers';

const toolBar = (props) => {
	const [prevScrollPos, setPrevScrollPos] = useState(0);
	const [visible, setVisible] = useState(true);

	const handleScroll = debounce(() => {
		const currentScrollPos = window.pageYOffset;

		setVisible(
			(prevScrollPos > currentScrollPos &&
				prevScrollPos - currentScrollPos > 30) ||
				currentScrollPos < 10
		);

		setPrevScrollPos(currentScrollPos);
	}, 100);

	const navbarStyles = {
		position: 'fixed',
		top: visible ? '1%' : '-30%',
		left: 0,
		right: 0,
		height: '100px',
		background: 'transparent',
		zIndex: 90,
		transition: 'top 0.6s',
	};

	useEffect(() => {
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, [prevScrollPos, visible, handleScroll]);

	return (
		<header style={{ ...navbarStyles }}>
			<div className={classes.NavbarItemsHolder}>
				<div className={classes.NavbarLogoHolder}>
					<Logo LogoNavbar />
				</div>
				<div className={classes.SearchInputHolder}>
					{props.profilePage ? (
						<h1>My travel page</h1>
					) : (
						<Search profilePage={props.profilepage} />
					)}
				</div>
				<nav className={classes.NavItemsHolder}>
					<NavigationItems
						profilePage={props.profilePage}
						isAuthenticated={props.authenticated}
					/>
				</nav>
			</div>
		</header>
	);
};

export default toolBar;
