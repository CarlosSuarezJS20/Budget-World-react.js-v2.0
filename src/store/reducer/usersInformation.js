import * as actionTypes from '../actions/actionTypes';
import { updateState } from './utility';

const initialState = {
	profilePictureURL: '',
	loadingProfilePicture: false,
	loadingProcessPercentage: 0,
};

const loadingProfileImageUrlStarts = (state, action) => {
	if (action.totalLoadingPercentage > 0) {
	}
};

const fetchingProfilePictureURLSuccess = (state, action) => {
	return updateState(state, {
		profilePictureURL: action.profilePicture_URL,
		loadingProfilePicture: false,
	});
};

const fetchLoadingPercentageFromFirebase = (state, action) => {
	return updateState(state, {
		loadingProcessPercentage:
			state.loadingProcessPercentage + action.loadingProcessPercentage,
	});
};

const loadingProfileImageUrlFailed = (state, action) => {};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.FETCH_PROFILE_IMAGE_URL_STARTS:
			return loadingProfileImageUrlStarts(state, action);
		case actionTypes.FETCH_PROFILE_IMG_PERCENTAGE:
			return fetchLoadingPercentageFromFirebase(state, action);
		case actionTypes.FETCH_PROFILE_IMAGE_URL_SUCCESS:
			return fetchingProfilePictureURLSuccess(state, action);
		case actionTypes.FETCH_PROFILE_IMAGE_URL_FAILED:
			return loadingProfileImageUrlFailed(state, action);
		default:
			return state;
	}
};

export default reducer;
