import React, { Component } from 'react';
import classes from './HomepageNavbar.css';
import Logo from '../../Logo/Logo';

import { NavLink } from 'react-router-dom';

import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';

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
						<li
							onClick={() => {
								alert('page under construction, please visit again soon ! ');
							}}
						>
							<a className={classes.AboutLink}>about</a>
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

const mapDispatchToProps = (dispatch) => {
	return {
		onCreatingAccountStatus: () =>
			dispatch(actions.creatingAccountStatusToggle()),
	};
};

export default connect(null, mapDispatchToProps)(HomepageNavbar);
