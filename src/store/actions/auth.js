import * as actionTypes from './actionTypes';
import axios from 'axios';

export const creatingAccountStatusToggle = () => {
	return {
		type: actionTypes.CREATING_ACCOUNT_STATUS_TOGGLE,
	};
};

export const authStart = () => {
	// No need for payload.
	return {
		type: actionTypes.AUTH_START,
	};
};

export const authSuccess = (authData) => {
	return {
		type: actionTypes.AUTH_SUCCESS,
		idToken: authData.idToken,
		userId: authData.localId,
	};
};

export const authFail = (error) => {
	// No need for payload.
	return {
		type: actionTypes.AUTH_FAIL,
		error: error,
	};
};

export const logout = () => {
	return {
		type: actionTypes.AUTH_LOGOUT,
	};
};

// dealing with expirating token and change the UI - invalidating token
export const checkAuthTimeOut = (expirationTime) => {
	return (dispatch) => {
		setTimeout(() => {
			dispatch(logout());
		}, expirationTime * 1000);
	};
};

export const auth = (email, password, creatingAccount) => {
	return (dispatch) => {
		dispatch(authStart());
		const authData = {
			email: email,
			password: password,
			returnSecureToken: true,
		};

		let url = !creatingAccount
			? 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAsm2AajbLjNnGdo4cb7pVXXfaxVkt-GKs'
			: 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAsm2AajbLjNnGdo4cb7pVXXfaxVkt-GKs';
		axios
			.post(url, authData)
			.then((res) => {
				dispatch(authSuccess(res.data));
				dispatch(checkAuthTimeOut(res.data.expiresIn));
				if (creatingAccount) {
					dispatch(creatingAccountStatusToggle());
				}
			})
			.catch((error) => {
				dispatch(authFail(error.response.data.error));
			});
	};
};
