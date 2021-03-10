import React from 'react';
import classes from './ProfileImage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCameraRetro, faUser } from '@fortawesome/free-solid-svg-icons';

const ProfileImage = (props) => {
	let style = { border: '2px solid rgb(190, 187, 187)' };

	if (props.profileImageURL.length > 0) {
		style = { border: '3px solid rgb(202, 202, 11)' };
	}
	return (
		<div className={classes.ImageSection}>
			<div className={classes.ProfileImageHolder} style={style}>
				{!props.profileImageURL.length > 0 ? (
					<FontAwesomeIcon icon={faUser} className={classes.ProfileImageIcon} />
				) : (
					<img
						src={
							props.profileImageURL.length > 0 ? props.profileImageURL : null
						}
						alt="profile-img"
						className={classes.ProfilePicture}
					/>
				)}
			</div>
			<button className={classes.UploadPictureBtn}>
				<FontAwesomeIcon
					icon={faCameraRetro}
					className={classes.CameraIcon}
					onClick={props.showUploadPictureModal}
				/>
			</button>
		</div>
	);
};

export default ProfileImage;
