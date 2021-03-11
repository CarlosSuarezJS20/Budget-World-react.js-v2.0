import React, { Component } from 'react';
import classes from './HomepageNavbar.css';
import Logo from '../../Logo/Logo';

import { NavLink } from 'react-router-dom';

class HomepageNavbar extends Component {
	render() {
		return (
			<header className={classes.NavbarHolder}>
				<nav className={classes.HomepageNavbar}>
					<div className={classes.LogoTitleHolder}>
						<Logo />
						<span>BW</span>
					</div>
					<ul className={classes.Navlinks}>
						<li>
							<NavLink to="/about-us">about</NavLink>
						</li>
						<li className={classes.Login}>
							<NavLink to="/login">Log in</NavLink>
						</li>
						<li className={classes.Register}>
							<NavLink
								to="/sign-up"
								onClick={this.props.onCreatingAccountStatus}
							>
								Sign Up
							</NavLink>
						</li>
					</ul>
				</nav>
			</header>
		);
	}
}

export default HomepageNavbar;
