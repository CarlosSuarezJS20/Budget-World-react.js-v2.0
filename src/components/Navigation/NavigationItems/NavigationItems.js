import React, { Component } from 'react';
import classes from './NavigationItems.css';
import NavigationItem from '../NavigationItem/NavigationItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faPlusCircle,
	faSignOutAlt,
	faUser,
} from '@fortawesome/free-solid-svg-icons';

import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';

class NavigationItems extends Component {
	render() {
		return this.props.isAuthenticated ? (
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

const mapDispatchToProps = (dispatch) => {
	return {
		onCreatingAccountStatus: () =>
			dispatch(actions.creatingAccountStatusToggle()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(NavigationItems);
