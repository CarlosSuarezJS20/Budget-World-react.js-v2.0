import React, { Component } from 'react';
import classes from './ItemFooter.css';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';
import { NavLink } from 'react-router-dom';

class ItemFooter extends Component {
	updateItem = (id) => {
		this.props.onToggleActiveUpdating(id);
	};

	render() {
		return (
			<div className={classes.CardFooter}>
				<div className={classes.FooterInfo}>
					<span>{this.props.itemCategory}</span>
					<span>{this.props.itemCountry}</span>
				</div>
				<div className={classes.CardBtns}>
					<NavLink
						to={'/update'}
						className={classes.FooterBtn}
						onClick={() => {
							this.updateItem(this.props.itemId);
						}}
					>
						update
					</NavLink>
					<a className={classes.FooterBtn}>delete</a>
				</div>
			</div>
		);
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onToggleActiveUpdating: (id) => dispatch(actions.toggleActiveUpdating(id)),
	};
};

export default connect(null, mapDispatchToProps)(ItemFooter);
