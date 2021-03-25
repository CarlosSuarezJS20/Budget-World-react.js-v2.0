import React, { Component } from "react";
import classes from "./MyProfilePage.css";
import ProfileImage from "./ProfileImage/ProfileImage";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import BioSection from "../MyProfilePage/BioSection/BioSection";
import UploadImageModal from "./UploadModal/UploadImageModal";
import { connect } from "react-redux";
import MyTrips from "./MyTrips/MyTrips";
import MyContributions from "./MyContributions/MyContributions";

import UsersOptions from "./UsersOptions/UsersOptions";
import { Redirect } from "react-router";

class MyProfilePage extends Component {
  state = {
    showUploadImageModal: false,
  };

  componentDidMount() {
    console.log(this.props);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.showUploadImageModal !== this.state.showUploadImageModal) {
      return true;
    }
  }

  showModalHandler = () => {
    this.setState((prevState) => ({
      showUploadImageModal: !prevState.showUploadImageModal,
    }));
  };

  render() {
    return !this.props.isAuthenticated ? (
      <Redirect to="/login" />
    ) : (
      <div className={classes.ProfilePageHolder}>
        <UploadImageModal
          show={this.state.showUploadImageModal}
          clicked={this.showModalHandler}
        />
        <Toolbar profilePage />
        <div className={classes.ProfileUserInfoSection}>
          <ProfileImage
            profileImageURL={this.props.userImageURL}
            showUploadPictureModal={this.showModalHandler}
          />
          <BioSection
            userId={this.props.userId}
            userToken={this.props.userToken}
          />
        </div>
        <UsersOptions />
        <div>
          <MyTrips />
          <MyContributions />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.authR.token != null,
    userImageURL: state.usersInformationR.profilePictureURL,
    userToken: state.authR.token,
    userId: state.authR.userId,
  };
};

export default connect(mapStateToProps, null)(MyProfilePage);
