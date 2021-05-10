import React, { Component } from "react";
import classes from "./StarRating.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import axios from "../../../axios";
import { connect } from "react-redux";

// Add border to stars

class StartRating extends Component {
  state = {
    rating: null,
    hover: null,
    sendingRating: false,
  };

  newRatingHandler = (ratingValue) => {
    this.setState({ rating: ratingValue, sendingRating: true });
    const cardRatingItem = {
      cardRating: ratingValue,
      userId: this.props.userId,
      cardId: this.props.cardId,
    };

    axios
      .post("/items-ratings.json?auth=" + this.props.token, cardRatingItem)
      .then((res) => {
        this.setState({ sendingRating: false });
        // catches the current rating for UI
        this.props.uiNewRating(cardRatingItem);
      })
      .catch((error) => {
        this.setState({ sendingRating: false });
        console.log(error);
      });
  };

  updateRatingHandler = (newRatingValue) => {
    this.setState({ rating: newRatingValue, sendingRating: true });
    const newRatingItem = {
      cardRating: newRatingValue,
      userId: this.props.userId,
      cardId: this.props.cardId,
    };

    const { id } = this.props.ratingCardsFromServer.find(
      (card) => card.cardId === this.props.cardId
    );
    axios
      .put(`/items-ratings/${id}.json?auth=${this.props.token}`, newRatingItem)
      .then((res) => {
        this.setState({ sendingRating: false });
        //This id is needed when updating the UI
        this.props.uiNewRating(newRatingItem);
        this.props.isUserRatingAgainHandler();
      })
      .catch((error) => {
        this.props.isUserRatingAgainHandler();
        this.setState({ sendingRating: false });
        console.log(error);
      });
  };

  setHoverHandler = (ratingValue) => {
    this.setState({ hover: ratingValue });
  };

  setHoverOutHandler = () => {
    this.setState({ hover: null });
  };

  render() {
    return (
      <div className={classes.StarRatingHolder}>
        {[...Array(5)].map((star, i) => {
          const ratingValue = i + 1;

          return (
            <label key={i}>
              <input
                type="radio"
                name="rating"
                value={ratingValue}
                onClick={() => {
                  if (this.state.sendingRating) {
                    return;
                  } else if (this.props.isUserRatingAgain) {
                    this.updateRatingHandler(ratingValue);
                  } else {
                    this.newRatingHandler(ratingValue);
                  }
                }}
              />
              <FontAwesomeIcon
                className={classes.Start}
                icon={faStar}
                style={{
                  color:
                    ratingValue <= (this.state.hover || this.state.rating)
                      ? "#ffc107"
                      : "#e4e5e9",
                }}
                onMouseEnter={() => {
                  this.setHoverHandler(ratingValue);
                }}
                onMouseLeave={() => {
                  this.setHoverOutHandler();
                }}
              />
            </label>
          );
        })}
        {this.props.isUserRatingAgain && (
          <p
            onClick={() => {
              this.props.isUserRatingAgainHandler;
            }}
          >
            back
          </p>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.authR.token,
    isAuthenticated: state.authR.token != null,
    userId: state.authR.userId,
  };
};

export default connect(mapStateToProps, null)(StartRating);
