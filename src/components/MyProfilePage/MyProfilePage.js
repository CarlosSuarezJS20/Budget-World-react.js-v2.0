import React, { Component } from 'react';
import classes from './MyProfilePage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

class MyProfilePage extends Component {
	render() {
		return (
			<div className={classes.ProfilePageHolder}>
				<div>
					<div className={classes.ProfileUserImageSection}>
						<div className={classes.ProfileImageHolder}>
							<FontAwesomeIcon
								icon={faUser}
								className={classes.ProfileImageIcon}
							/>
						</div>
						<div className={classes.UploadImageBtnHolder}>
							<button>upload profile Pic !</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default MyProfilePage;
