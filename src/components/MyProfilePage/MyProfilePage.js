import React, { Component } from 'react';
import classes from './MyProfilePage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCameraRetro, faUser } from '@fortawesome/free-solid-svg-icons';
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
		let style = { border: '2px solid rgb(190, 187, 187)' };

		if (this.props.userImageURL.length > 0) {
			style = { border: '3px solid rgb(202, 202, 11)' };
		}
		return (
			<div className={classes.ProfilePageHolder}>
				<UploadImageModal
					show={this.state.showUploadImageModal}
					clicked={this.showModalHandler}
				/>
				<div>
					<div className={classes.ProfileUserImageSection}>
						<div className={classes.ProfileImageHolder} style={style}>
							{!this.props.userImageURL.length > 0 ? (
								<FontAwesomeIcon
									icon={faUser}
									className={classes.ProfileImageIcon}
								/>
							) : (
								<img
									src={
										this.props.userImageURL.length > 0
											? this.props.userImageURL
											: null
									}
									alt="profile-img"
									className={classes.ProfilePicture}
								/>
							)}
						</div>
						<div className={classes.UploadImageBtnHolder}>
							<button>
								<FontAwesomeIcon
									icon={faCameraRetro}
									className={classes.CameraIcon}
									onClick={this.showModalHandler}
								/>
							</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		userImageURL: state.usersInformationR.profilePictureURL,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(MyProfilePage);
