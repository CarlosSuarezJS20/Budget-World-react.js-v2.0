import React, { Component } from 'react';
import classes from './UploadImageModal.css';
import Modal from '../../UI/Modal/Modal';
import Input from '../../UI/Input/Input';
import { connect } from 'react-redux';
import firebase from '../../../firebase';
import * as actions from '../../../store/actions/index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

// Validity of the Input
const checkValidity = (value, rules) => {
	let isValid = true;

	if (rules.required) {
		isValid = value !== '' && isValid;
	}

	return isValid;
};

class UploadImageModal extends Component {
	state = {
		imageURL: {
			elementType: 'input',
			elementConfig: {
				type: 'file',
				placeholder: 'imageURL',
			},
			value: '',
			validation: {
				required: true,
			},
			valid: false,
			touched: false,
		},
		profileImage: null,
	};

	// Re-sets to initial values
	clearsInput = () => {
		const copyOfInputEl = this.state.imageURL;
		copyOfInputEl.value = '';
		this.props.onFetchingLoadingPercentage(0);
		this.setState({ imageURL: copyOfInputEl });
	};

	sendImageToDataBase = () => {
		let bucketName = 'users-profile-pictures';
		let file = this.state.profileImage;
		let storageRef = firebase
			.storage()
			.ref(`${bucketName}/${this.props.userId}`);
		let uploadImage = storageRef.put(file);
		uploadImage.on(firebase.storage.TaskEvent.STATE_CHANGED, (snapshot) => {
			const progress = Math.round(
				(snapshot.bytesTransferred / snapshot.totalBytes) * 100
			);
			this.props.onFetchingLoadingPercentage(progress);
		});
	};

	ImageInputChangedHandler = (event) => {
		this.setState({ profileImage: event.target.files[0] });
		const copyOfInputEl = this.state.imageURL;
		copyOfInputEl.value = event.target.value;

		copyOfInputEl.valid = checkValidity(
			copyOfInputEl.value.trim(),
			copyOfInputEl.validation
		);
		copyOfInputEl.touched = true;
		this.setState({ imageURL: copyOfInputEl });
	};

	saveImage = () => {
		let storageRef = firebase.storage().ref();
		storageRef.child(`users-profile-pictures/${this.props.userId}`);
		storageRef
			.child(`users-profile-pictures/${this.props.userId}`)
			.getDownloadURL()
			.then((url) => {
				this.props.onGettingProfilePictureUrl(url);
				this.props.clicked();
				this.clearsInput();
			});
	};

	cancelUploadHander = () => {
		this.props.clicked();
		this.clearsInput();
	};

	render() {
		return (
			<Modal
				uploadImageModal
				show={this.props.show}
				clicked={this.cancelUploadHander}
			>
				<header className={classes.ModalHeader}>
					<h2>update profile pic</h2>
					<FontAwesomeIcon
						icon={faTimes}
						className={classes.CloseFilterSectionBtn}
						onClick={this.cancelUploadHander}
					/>
				</header>
				<div className={classes.InputHolder}>
					<Input
						uploadImageModal
						key={this.state.imageURL.elementType}
						elementType={this.state.imageURL.type}
						elementConfig={this.state.imageURL.elementConfig}
						value={this.state.imageURL.value}
						invalid={!this.state.imageURL.valid}
						shouldValidate={this.state.imageURL.validation}
						touched={this.state.imageURL.touched}
						uploadProgress={this.props.progressPercentage}
						saveImg={this.sendImageToDataBase}
						changed={(event) => this.ImageInputChangedHandler(event)}
					/>
				</div>
				<div className={classes.UploadBtn}>
					<button
						disabled={this.props.progressPercentage !== 100}
						onClick={this.saveImage}
					>
						save changes
					</button>
				</div>
			</Modal>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		userId: state.authR.userId,
		progressPercentage: state.usersInformationR.loadingProcessPercentage,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onGettingProfilePictureUrl: (profileImageURL) => {
			dispatch(actions.fetchProfilePictureSuccess(profileImageURL));
		},
		onFetchingLoadingPercentage: (percentage) => {
			dispatch(actions.fetchProfilePicLoadingPercentage(percentage));
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(UploadImageModal);
