import React, { Component } from 'react';
import classes from './ToolTip.css';
import BackDrop from '../Backdrop/Backdrop';

import { NavLink } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';

class Tooltip extends Component {
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
		this.props.onDeletionItemStart(id);
		this.props.onClosingTooltip();
	};

	render() {
		let initialClass = [classes.ToolTipHolder];

		if (this.props.requestedTooltip) {
			initialClass = [classes.ToolTipHolder, classes.Open];
		}

		return (
			<React.Fragment>
				<BackDrop
					toolTipShow
					show={this.props.requestedTooltip}
					clicked={this.props.onClosingTooltip}
				/>
				<div className={initialClass.join(' ')}>
					<div className={classes.Info}>
						<div className={classes.TitleHolder}>
							<FontAwesomeIcon
								icon={faTimes}
								className={classes.CloseOptionsModal}
								onClick={this.props.onClosingTooltip}
							/>
							<span>options</span>
						</div>
						<NavLink
							to={'/update'}
							className={classes.FooterBtn}
							onClick={() => {
								this.updateItemHandler(this.props.tooltipElId);
							}}
						>
							update
						</NavLink>
						<a
							className={classes.FooterBtn}
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
		onDeletionItemStart: (id) => dispatch(actions.deletionItemStart(id)),
		onClosingTooltip: () => dispatch(actions.closeTooltipHandler()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Tooltip);
