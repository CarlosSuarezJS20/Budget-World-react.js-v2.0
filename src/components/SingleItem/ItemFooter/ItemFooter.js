import React, { Component } from 'react';
import classes from './ItemFooter.css';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';

class ItemFooter extends Component {
	updateItem = () => {
		this.props.onToggleActiveUpdating();
	};

	render() {
		return (
			<div className={classes.CardFooter}>
				<div className={classes.FooterInfo}>
					<span>{this.props.itemCategory}</span>
					<span>{this.props.itemCountry}</span>
				</div>
				<div className={classes.CardBtns}>
					<button
						className={classes.FooterBtn}
						onClick={() => {
							this.updateItem(this.props.id);
						}}
					>
						update
					</button>
					<button className={classes.FooterBtn}>delete</button>
				</div>
			</div>
		);
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onToggleActiveUpdating: () => dispatch(actions.toggleActiveUpdating()),
	};
};

export default connect(null, mapDispatchToProps)(ItemFooter);
