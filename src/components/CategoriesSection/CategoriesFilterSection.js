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
						this.props.onClickedValueHandler(e);
						this.classActiveHandler(btn);
					}}
					value={btn}
					className={classes.Button}
					style={selected === btn ? { ...activeStyle } : null}
				>
					{btn}
				</button>
			);
		});

		return (
			<React.Fragment>
				<div className={classes.ButtonsSection}>{btns}</div>
				{this.state.selected.length > 0 && (
					<div className={classes.ClearFilters}>
						<button
							value="ALL"
							onClick={(e) => {
								this.classActiveHandler(e);
								this.props.onClickedValueHandler(e);
							}}
						>
							clear filter
						</button>
					</div>
				)}
			</React.Fragment>
		);
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onClickedValueHandler: (event) =>
			dispatch(actions.categoryFilterHandler(event)),
	};
};

export default connect(null, mapDispatchToProps)(CategoriesFilterSection);
