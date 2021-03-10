import React, { Component } from 'react';
import classes from './NavigationItems.css';
import NavigationItem from '../NavigationItem/NavigationItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faPlusCircle,
	faSignOutAlt,
	faUser,
	faCompass,
} from '@fortawesome/free-solid-svg-icons';

import { connect } from 'react-redux';

class NavigationItems extends Component {
	render() {
		let navigationItems = (
			<ul className={classes.NavigationItems}>
				<NavigationItem link="/add-new" exact>
					<FontAwesomeIcon
						icon={faPlusCircle}
						className={classes.NavbarButton}
					/>
				</NavigationItem>
				<NavigationItem link="/my-profile">
					<FontAwesomeIcon icon={faUser} className={classes.NavbarButton} />
				</NavigationItem>
				<NavigationItem link="/logout">
					<FontAwesomeIcon
						icon={faSignOutAlt}
						className={classes.NavbarButton}
					/>
				</NavigationItem>
			</ul>
		);

		if (this.props.profilePage) {
			navigationItems = (
				<ul className={classes.NavigationItems}>
					<NavigationItem link="/discover">
						<FontAwesomeIcon
							icon={faCompass}
							className={classes.NavbarButton}
						/>
					</NavigationItem>
					<NavigationItem link="/logout">
						<FontAwesomeIcon
							icon={faSignOutAlt}
							className={classes.NavbarButton}
						/>
					</NavigationItem>
				</ul>
			);
		}

		return this.props.isAuthenticated ? (
			navigationItems
		) : (
			<ul
				className={classes.NavigationItems}
				onClick={this.props.onCreatingAccountStatus}
			>
				<NavigationItem
					signUp
					link="/sign-up"
					signupClassName={classes.SignupBtn}
				>
					sign-up
				</NavigationItem>
			</ul>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isAuthenticated: state.authR.token !== null,
	};
};

export default connect(mapStateToProps, null)(NavigationItems);
