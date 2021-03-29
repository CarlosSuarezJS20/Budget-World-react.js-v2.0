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
    users: null,
    userRated: false,
  };

  componentDidMount() {
    axios
      .get(`/items-ratings.json?orderBy="cardId"&equalTo="${this.props.id}"`)
      .then((res) => {
        let itemRating = [];
        for (let item in res.data) {
          itemRating.push({ ...res.data[item], id: item });
        }

        let ratingAverage;
        let userRatingOwnersId;

        if (itemRating.length > 0) {
          ratingAverage =
            itemRating
              .map((rating) => rating.cardRating)
              .reduce((p, c) => p + c) / itemRating.length;

          userRatingOwnersId = itemRating.map((rating) => rating.userId);

          if (userRatingOwnersId.includes(this.props.storedUserId)) {
            this.setState({ userRated: true });
          }
        }

        this.setState({
          stars: itemRating.length > 0 ? Math.round(ratingAverage) : 0,
          users: userRatingOwnersId,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    let rating = <StartRating cardId={this.props.id} />;

    if (this.state.userRated) {
      rating = <p className={classes.RateAgainOption}>rate again</p>;
    }

    return (
      <article className={classes.Card} id={this.props.id}>
        <div className={classes.OverLayer}></div>
        {this.props.isAuthenticated && rating}

        {this.state.stars > 0 && (
          <div className={classes.RatingHolder}>
            <h3>{`Rated by ${
              this.state.users && this.state.users.length
            } travellers`}</h3>
            {[...Array(this.state.stars)].map((star, i) => {
              return (
                <FontAwesomeIcon
                  key={i}
                  icon={faStar}
                  className={classes.RatingStar}
                />
              );
            })}
            {[...Array(5 - this.state.stars)].map((star, i) => {
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
