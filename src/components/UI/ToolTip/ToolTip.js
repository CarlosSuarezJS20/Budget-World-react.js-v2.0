import React, { Component } from "react";
import classes from "./ToolTip.css";
import BackDrop from "../Backdrop/Backdrop";

import { NavLink, withRouter } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

import { connect } from "react-redux";
import * as actions from "../../../store/actions/index";

class Tooltip extends Component {
  state = {
    approving: false,
  };

  shouldComponentUpdate(nextProps) {
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

  approvedBtnHandler = (id) => {};

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
        height: "280px",
        width: "230px",
      };
    }

    return (
      <React.Fragment>
        <BackDrop
          toolTipShow
          show={this.props.requestedTooltip}
          clicked={this.props.onClosingTooltip}
        />
        <div className={initialClass.join(" ")} style={style}>
          <div>
            <div className={classes.TitleHolder}>
              <FontAwesomeIcon
                icon={faTimes}
                className={classes.CloseOptionsModal}
                onClick={this.props.onClosingTooltip}
              />
              <span>options</span>
            </div>
            <NavLink
              to={{ pathname: this.props.match.url + "/update" }}
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
          <div className={classes.ApproveSection}>
            <a
              className={classes.ApproveBtn}
              onClick={() => {
                this.approvedBtnHandler(this.props.tooltipElId);
              }}
            >
              approve?
            </a>
            <div className={classes.ApproveOptionsHolder}>
              <button className={classes.ApproveOptionBtn}>yes</button>
              <button className={classes.ApproveOptionBtn}>No</button>
            </div>
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

export default React.memo(
  connect(mapStateToProps, mapDispatchToProps)(withRouter(Tooltip))
);
