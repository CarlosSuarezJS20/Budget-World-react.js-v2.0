import React, { Component } from "react";
import classes from "./ItemCloseUpView.css";

import { connect } from "react-redux";
import * as actions from "../../store/actions/index";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import axios from "../../axios";
import Loader from "../UI/Loader/Loader";
import Items from "../../components/Items/Items";
import Spinner from "../UI/Spinner/Spinner";
import ToolTip from "../UI/ToolTip/ToolTip";

class ItemCloseUpView extends Component {
  state = {
    item: null,
    additionalItems: [],
    loading: false,
  };

  componentDidMount() {
    // More suggestions
    this.setState({ loading: true });
    axios
      .get(
        `/items.json?orderBy="country"&equalTo="${this.props.location.state.country}"`
      )
      .then((res) => {
        const fetchedItems = [];
        for (let item in res.data) {
          fetchedItems.push({
            ...res.data[item],
            id: item,
          });
        }
        this.setState({ loading: false });
        this.setState({ additionalItems: fetchedItems });
      })
      .catch((error) => {
        this.setState({ loading: false });
        console.log(error);
      });
  }

  render() {
    return (
      <section className={classes.CloseUpSection}>
        <Loader />
        <ToolTip itemCloseUp />

        <div
          className={classes.ItemContainer}
          id={this.props.location.state.id}
        >
          <div className={classes.OptionsMenuContainer}>
            <FontAwesomeIcon
              icon={faChevronLeft}
              className={classes.BackToDiscoveryArrow}
              onClick={() => {
                this.props.history.goBack();
              }}
            />
            <div
              className={classes.MenuWrapper}
              onClick={() => {
                this.props.onOpenTooltip();
                this.props.onElementIdForToolTip(this.props.location.state.id);
              }}
            >
              <FontAwesomeIcon
                icon={faEllipsisV}
                className={classes.EllipsisClass}
              />
            </div>
          </div>
          <img
            src={this.props.location.state.image}
            className={classes.ItemImage}
            alt="item-"
          />
          <div style={{ height: "300px" }}></div>
        </div>
        <div className={classes.MoreSuggestionsContainer}>
          <header className={classes.MoreSuggestionsTitle}>
            {this.state.loading ? <Spinner /> : <h2>More choices... yes! </h2>}
          </header>
          <div className={classes.AdditionalItems}>
            <Items items={this.state.additionalItems} />
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    storedUserId: state.authR.userId,
    isAuthenticated: state.authR.token != null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onOpenTooltip: () => dispatch(actions.requestTooltipHandler()),
    onElementIdForToolTip: (id) => dispatch(actions.itemIdForTooltip(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemCloseUpView);
