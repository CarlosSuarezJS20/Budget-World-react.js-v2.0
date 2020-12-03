import * as actionTypes from '../actions/actionTypes';
import { updateState } from './utility';

const initialState = {
	token: null,
	userId: null,
	errorAuthentication: null,
	loadingAuth: false,
};

const authStart = (state) => {
	return updateState(state, { error: null, loadingAuth: true });
};
const authSuccess = (state, action) => {
	return updateState(state, {
		token: action.idToken,
		userId: action.userId,
		errorAuthentication: null,
		loadingAuth: false,
	});
};
const authFail = (state, action) => {
	return updateState(state, {
		errorAuthentication: action.error,
		loadingAuth: false,
	});
};

const authLogout = (state) => {
	return updateState(state, { token: null, userId: null });
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.AUTH_START:
			return authStart(state);
		case actionTypes.AUTH_SUCCESS:
			return authSuccess(state, action);
		case actionTypes.AUTH_FAIL:
			return authFail(state, action);
		case actionTypes.AUTH_LOGOUT:
			return authLogout(state);
		default:
			return state;
	}
};

export default reducer;
