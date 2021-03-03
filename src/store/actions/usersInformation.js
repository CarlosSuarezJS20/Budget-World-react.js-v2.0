import * as actionTypes from './actionTypes';

export const fetchProfilePictureStarts = () => {
	return {
		type: actionTypes.FETCH_PROFILE_IMAGE_URL_STARTS,
	};
};

export const fetchProfilePicLoadingPercentage = (percentage) => {
	return {
		type: actionTypes.FETCH_PROFILE_IMG_PERCENTAGE,
		loadingProcessPercentage: percentage,
	};
};

export const fetchProfilePictureSuccess = (profilePictureURL) => {
	return {
		type: actionTypes.FETCH_PROFILE_IMAGE_URL_SUCCESS,
		profilePicture_URL: profilePictureURL,
	};
};

export const fetchProfilePictureFailed = (loadingPercentage) => {
	return {
		type: actionTypes.FETCH_PROFILE_IMAGE_URL_FAILED,
		totalLoadingPercentage: loadingPercentage,
	};
};
