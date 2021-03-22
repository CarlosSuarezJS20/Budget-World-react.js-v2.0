import React, { Component } from "react";
import classes from "./MyContributions.css";
import * as actions from "../../../store/actions/index";
import { connect } from "react-redux";
import SingleContributionImageHolder from "../../Items/SingleItem/ImageHolder/ImageHolder";
import MyProfileLoader from "../MyProfileLoader/MyProfileLoader";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import { NavLink } from "react-router-dom";
import Input from "../../UI/Input/Input";

export class MyContributions extends Component {
  state = {
    itemName: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Country or City",
      },
      value: "",
    },
  };

  componentDidMount() {
    this.props.onFetchingUserContributions(this.props.userId);
  }

  inputSeachChangedHandler = (event) => {
    const copyOfInput = this.state.itemName;
    copyOfInput.value = event.target.value;
    this.setState({ itemName: copyOfInput });
  };

  render() {
    let userContributions = [...this.props.contributions];

    if (this.state.itemName.value.length > 0) {
      userContributions = this.props.contributions.filter(
        (contribution) => contribution.country === this.state.itemName.value
      );
      console.log(userContributions);
    }

    return (
      <div className={classes.ContributionsSection}>
        <div className={classes.SearchContainer}>
          <div className={classes.SearchItems}>
            <Input
              key={"searchContribution"}
              elementType={this.state.itemName.elementType}
              elementConfig={this.state.itemName.elementConfig}
              value={this.state.itemName.value}
              changed={(event) => {
                this.inputSeachChangedHandler(event);
              }}
            />
            <button>
              <FontAwesomeIcon icon={faSearch} className={classes.SearchIcon} />
            </button>
          </div>
        </div>
        <div className={classes.ContributionsHolder}>
          {this.props.contributions.length > 0 && (
            <div className={classes.ContributionsInfoHolder}>
              <h3>your contributions</h3>
              <p>{`total contributions ${this.props.contributions.length}`}</p>
            </div>
          )}
          <div
            className={
              this.props.contributions.length > 0
                ? classes.Contributions
                : classes.ContributionEmptyHolder
            }
          >
            {this.props.loading ? (
              <div className={classes.LoaderHolder}>
                <MyProfileLoader />
              </div>
            ) : this.props.contributions.length === 0 ? (
              <div className={classes.InfoAndAddNewHolder}>
                <h2>No Contributions</h2>
                <NavLink to="/add-new">add new</NavLink>
              </div>
            ) : (
              userContributions.map((contribution) => (
                <SingleContributionImageHolder
                  key={contribution.id}
                  image={contribution.image}
                  city={contribution.city}
                />
              ))
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userId: state.authR.userId,
    loading: state.itemsR.loading,
    contributions: state.userContributionsR.contributions,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchingUserContributions: (userId) => {
      dispatch(actions.fetchContributionsFromServer(userId));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyContributions);
