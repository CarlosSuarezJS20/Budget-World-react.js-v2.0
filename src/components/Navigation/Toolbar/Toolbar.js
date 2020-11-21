import React from 'react';
import classes from './Toolbar.css';
import Logo from '../../Logo/Logo';
import Search from '../Search/Search';

const toolBar = (props) => {
	return (
		<header className={classes.Navbar}>
			<Logo />
			<Search />
			<div>
				<ul>
					<li>Add New</li>
					<li>Plan Trip</li>
					<li>Log Out</li>
				</ul>
			</div>
		</header>
	);
};

export default toolBar;
