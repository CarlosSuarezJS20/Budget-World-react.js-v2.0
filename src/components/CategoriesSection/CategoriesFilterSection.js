import React, { Component } from 'react';
import classes from './CatergoriesFilterSection.css';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import { activeColorChanger } from '../Utilities/helpers';

class CategoriesFilterSection extends Component {
	state = {
		buttons: ['Food & drinks', 'Activities', 'Transport', 'Souvenirs', 'other'],
		selected: '',
	};

	classActiveHandler = (name) => {
		this.setState({ selected: name });
	};

	render() {
		const activeStyle = {
			color: 'rgb(248, 248, 248)',
			textTransform: 'capitalize',
			fontWeight: 'bold',
			padding: '10px 0',
			background: activeColorChanger(this.state.selected),
			border: `1px solid ${activeColorChanger(this.state.selected)}`,
			borderRadius: '90px',
			transition: 'all 0.3s linear',
			cursor: 'pointer',
			outline: ' none',
		};

		const { buttons, selected } = this.state;

		let btns = buttons.sort().map((btn) => {
			return (
				<button
					key={btn}
					onClick={(e) => {
						if (this.props.category === '') {
							this.props.onClickedValueHandler(e);
							this.classActiveHandler(btn);
						} else if (this.props.category !== e.target.value) {
							this.props.onClickedValueHandler(e);
							this.classActiveHandler(btn);
						} else {
							this.props.onClickReSettingCategory();
							// allows to resert the class to original by adding an empty value
							this.classActiveHandler('');
						}
					}}
					value={btn}
					className={classes.Button}
					style={selected === btn ? { ...activeStyle } : null}
				>
					{btn}
				</button>
			);
		});

		return <div className={classes.ButtonsSection}>{btns}</div>;
	}
}

const mapStateToProps = (state) => {
	return {
		category: state.filtersR.category,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onClickedValueHandler: (event) =>
			dispatch(actions.categoryFilterHandler(event)),
		onClickReSettingCategory: () => {
			dispatch(actions.categoryResettingHandler());
		},
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(CategoriesFilterSection);
