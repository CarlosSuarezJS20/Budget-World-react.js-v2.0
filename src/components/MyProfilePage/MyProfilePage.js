import React, { Component } from 'react';
import classes from './MyProfilePage.css';
import ProfileImage from './ProfileImage/ProfileImage';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import BioSection from '../MyProfilePage/BioSection/BioSection';
import UploadImageModal from './UploadModal/UploadImageModal';
import { connect } from 'react-redux';

class MyProfilePage extends Component {
	state = {
		showUploadImageModal: false,
	};

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
		return (
			<div className={classes.ProfilePageHolder}>
				<UploadImageModal
					show={this.state.showUploadImageModal}
					clicked={this.showModalHandler}
				/>
				<Toolbar profilePage />
				<div className={classes.ProfileUserImageSection}>
					<ProfileImage
						profileImageURL={this.props.userImageURL}
						showUploadPictureModal={this.showModalHandler}
					/>
				</div>
				<BioSection />
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		userImageURL: state.usersInformationR.profilePictureURL,
	};
};

export default connect(mapStateToProps, null)(MyProfilePage);
