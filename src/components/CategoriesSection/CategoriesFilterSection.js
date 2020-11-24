import React, { Component } from 'react';
import classes from './CatergoriesFilterSection.css';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

class CategoriesFilterSection extends Component {
	state = {
		buttons: [
			'Food-&-beverage',
			'Activities',
			'Transport',
			'Souvenirs',
			'other',
			'ALL',
		],
		selected: '',
	};

	classActiveHandler = (name) => {
		this.setState({ selected: name });
	};

	render() {
		const { buttons, selected } = this.state;

		let btns = buttons.map((btn) => {
			return (
				<button
					key={btn}
					onClick={(e) => {
						this.props.onClickedValueHandler(e);
						this.classActiveHandler(btn);
					}}
					value={btn}
					className={selected === btn ? classes.Active : classes.Button}
				>
					{btn}
				</button>
			);
		});

		return <div className={classes.ButtonsSection}>{btns}</div>;
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onClickedValueHandler: (event) =>
			dispatch(actions.categoryFilterHandler(event)),
	};
};

export default connect(null, mapDispatchToProps)(CategoriesFilterSection);
