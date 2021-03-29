import React, { Component } from "react";
import classes from "./StarRating.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import axios from "../../../axios";
import { connect } from "react-redux";

class StartRating extends Component {
  state = {
    rating: null,
    hover: null,
    sendingRating: false,
  };

  ratingHandler = (ratingValue) => {
    this.setState({ rating: ratingValue, sendingRating: true });
    const cardRating = {
      cardRating: ratingValue,
      userId: this.props.userId,
      cardId: this.props.cardId,
    };

    axios
      .post("/items-ratings.json?auth=" + this.props.token, cardRating)
      .then((res) => {
        this.setState({ sendingRating: false });
      })
      .catch((error) => {
        this.setState({ sendingRating: false });
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
                  this.ratingHandler(ratingValue);
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
