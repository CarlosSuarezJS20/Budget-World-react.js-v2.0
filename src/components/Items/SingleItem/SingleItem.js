import React, { Component } from "react";
import classes from "./SingleItem.css";
import ImageHolder from "./ImageHolder/ImageHolder";
import ItemInfo from "./ItemInfo/ItemInfo";
import ItemFooter from "./ItemFooter/ItemFooter";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV, faStar } from "@fortawesome/free-solid-svg-icons";

import { connect } from "react-redux";
import * as actions from "../../../store/actions/index";
import StartRating from "../StarRating/StarsRating";
import axios from "../../../axios";

class SingleItem extends Component {
  state = {
    stars: 0,
    currentUserRating: 0,
    usersRatings: [],
    ratingAgain: false,
  };
  componentDidUpdate(prevProps, prevState) {
    if (prevState.ratingAgain !== this.state.ratingAgain) {
      axios
        .get(`/items-ratings.json?orderBy="cardId"&equalTo="${this.props.id}"`)
        .then((res) => {
          let itemRatings = [];
          for (let item in res.data) {
            itemRatings.push({ ...res.data[item], id: item });
          }
          this.setState({ usersRatings: itemRatings });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  componentDidMount() {
    //Fetching the rating object for individual card from server
    axios
      .get(`/items-ratings.json?orderBy="cardId"&equalTo="${this.props.id}"`)
      .then((res) => {
        let itemRatings = [];
        for (let item in res.data) {
          itemRatings.push({ ...res.data[item], id: item });
        }
        this.setState({ usersRatings: itemRatings });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  uiRatingHandler = (cardRatingItem) => {
    if (this.state.ratingAgain) {
      const { cardId } = this.state.currentRatingCardToUpdate;
      const userRatingToUpdateIndex = this.state.usersRatings.findIndex(
        (userRating) => userRating.cardId === cardId
      );
      const copyOfUsersRating = this.state.usersRatings;
      copyOfUsersRating.splice(userRatingToUpdateIndex, 1);
      copyOfUsersRating.push(cardRatingItem);
      this.setState({ usersRatings: copyOfUsersRating });
    } else {
      const currentUsersRating = this.state.usersRatings;
      currentUsersRating.push(cardRatingItem);
      this.setState({
        currentUserRating: cardRatingItem.cardRating,
        usersRatings: currentUsersRating,
      });
    }
  };

  updateRatingHandler = () => {
    const ratingToUpdate = this.state.usersRatings.find((rating) => {
      return rating.cardId === this.props.id;
    });
    this.setState((prev) => ({
      ratingAgain: !prev.ratingAgain,
      currentRatingCardToUpdate: ratingToUpdate,
    }));
  };

  render() {
    let rating = (
      <StartRating
        cardId={this.props.id}
        uiNewRating={this.uiRatingHandler}
        isUserRatingAgain={this.state.ratingAgain}
        isUserRatingAgainHandler={this.updateRatingHandler}
        ratingCardsFromServer={this.state.usersRatings}
      />
    );

    if (
      (this.state.usersRatings
        .map((rating) => rating.userId)
        .includes(this.props.storedUserId) ||
        this.state.currentUserRating > 0) &&
      !this.state.ratingAgain
    ) {
      rating = (
        <p
          className={classes.RateAgainOption}
          onClick={this.updateRatingHandler}
        >
          rate again
        </p>
      );
    }

    let stars = 0;

    if (this.state.usersRatings.length > 0) {
      stars =
        this.state.usersRatings
          .map((rating) => rating.cardRating)
          .reduce((p, c) => p + c) / this.state.usersRatings.length;
    }

    return (
      <article className={classes.Card} id={this.props.id}>
        <div className={classes.OverLayer}></div>
        {this.props.isAuthenticated
          ? rating
          : this.props.isAuthenticated && this.state.ratingAgain
          ? rating
          : null}
        {stars > 0 && (
          <div className={classes.RatingHolder}>
            <h3>{`Rated by ${this.state.usersRatings.length} traveller${
              this.state.usersRatings.length === 1 ? "" : "s"
            }`}</h3>
            {[...Array(Math.round(stars))].map((star, i) => {
              return (
                <FontAwesomeIcon
                  key={i}
                  icon={faStar}
                  className={classes.RatingStar}
                />
              );
            })}
            {[...Array(5 - Math.round(stars))].map((star, i) => {
              return (
                <FontAwesomeIcon
                  key={i}
                  icon={faStar}
                  className={classes.EmptyRatingStar}
                />
              );
            })}
          </div>
        )}

        {this.props.storedUserId === this.props.userId && (
          <div className={classes.ToggleOptionsSection}>
            <div
              className={classes.ToggleOptionsHolder}
              onClick={() => {
                this.props.onOpenTooltip();
                this.props.onElementIdForToolTip(this.props.id);
              }}
            >
              <FontAwesomeIcon
                icon={faEllipsisV}
                className={classes.ToggleSign}
              />
            </div>
          </div>
        )}

        <ImageHolder image={this.props.image} city={this.props.city} />
        <ItemInfo
          itemName={this.props.title}
          itemPrice={this.props.price}
          itemDescription={this.props.description}
        />
        <ItemFooter
          itemId={this.props.id}
          itemCategory={this.props.category}
          itemCountry={this.props.country}
          itemUserId={this.props.userId}
        />
      </article>
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

export default connect(mapStateToProps, mapDispatchToProps)(SingleItem);
