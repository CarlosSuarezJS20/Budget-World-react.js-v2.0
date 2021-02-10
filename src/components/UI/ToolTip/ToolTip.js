import React, { Component } from 'react';
import classes from './ToolTip.css';
import BackDrop from '../Backdrop/Backdrop';

import { NavLink } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';

class Tooltip extends Component {
	componentDidMount() {
		document.body.onresize = () => {
			let backDrop = document.getElementById('back-drop');

			if (backDrop) {
				document.getElementById('back-drop').click();
			}
		};
	}

	shouldComponentUpdate(nextProps, nextState) {
		return (
			nextProps.requestedTooltip !== this.props.requestedTooltip ||
			nextProps.tooltipElId !== this.props.tooltipElId
		);
	}

	updateItemHandler = (id) => {
		this.props.onToggleActiveUpdating(id);
		this.props.onClosingTooltip();
	};

	deleteBtnHandler = (id) => {
		this.props.onDeletingItemStart(id);
		this.props.onClosingTooltip();
	};

	render() {
		// Conditions the initial class depending on the screen size. This helps to swich styling depending on screen size
		let initialClass = [
			window.innerWidth >= 768
				? classes.ToolTipHolderAbove700px
				: classes.ToolTipHolder,
		];
		let style;

		if (this.props.requestedTooltip) {
			initialClass = [
				window.innerWidth >= 768
					? classes.ToolTipHolderAbove700px
					: classes.ToolTipHolder,
				classes.Open,
			];
		}

		if (this.props.requestedTooltip && window.innerWidth >= 768) {
			let elementRequiringToolTip = document.getElementById(
				this.props.tooltipElId
			);
			const hostElPositionLeft = elementRequiringToolTip.offsetLeft;
			const hostElPositionTop = elementRequiringToolTip.offsetTop;

			style = {
				top: hostElPositionTop,
				left: hostElPositionLeft,
				height: '200px',
				width: '230px',
			};
		}

		return (
			<React.Fragment>
				<BackDrop
					toolTipShow
					show={this.props.requestedTooltip}
					clicked={this.props.onClosingTooltip}
				/>
				<div className={initialClass.join(' ')} style={style}>
					<div>
						<div
							className={classes.TitleHolder}
							onClick={this.props.onClosingTooltip}
						>
							<FontAwesomeIcon
								icon={faTimes}
								className={classes.CloseOptionsModal}
							/>
							<span>options</span>
						</div>
						<NavLink
							to={'/update'}
							className={classes.TooltipBtn}
							onClick={() => {
								this.updateItemHandler(this.props.tooltipElId);
							}}
						>
							edit
						</NavLink>
						<a
							className={classes.TooltipBtn}
							onClick={() => {
								this.deleteBtnHandler(this.props.tooltipElId);
							}}
						>
							delete
						</a>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		items: state.itemsR.items,
		requestedTooltip: state.itemsR.requestedTooltip,
		tooltipElId: state.itemsR.tooltipElId,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onToggleActiveUpdating: (id) => dispatch(actions.toggleActiveUpdating(id)),
		onDeletingItemStart: (id) => dispatch(actions.deletingItemStart(id)),
		onClosingTooltip: () => dispatch(actions.closeTooltipHandler()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Tooltip);
