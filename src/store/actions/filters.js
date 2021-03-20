import * as actionTypes from './actionTypes';

export const inputHandler = (value) => {
	return {
		type: actionTypes.INPUT_ONCHANGED_HANDLER,
		eventValue: value,
	};
};

export const categoryFilterHandler = (event) => {
	return {
		type: actionTypes.CATEGORY_FILTER_HANDLER,
		event: event,
	};
};

export const categoryResettingHandler = () => {
	return {
		type: actionTypes.CATEGORY_RESETTING_HANDLER,
	};
};
