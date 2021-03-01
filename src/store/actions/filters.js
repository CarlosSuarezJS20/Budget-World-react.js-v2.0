import * as actionTypes from './actionTypes';

export const inputHandler = (event) => {
	return {
		type: actionTypes.INPUT_ONCHANGED_HANDLER,
		eventValue: event.target.value,
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
