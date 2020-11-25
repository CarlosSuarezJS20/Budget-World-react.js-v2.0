import * as actionTypes from './actionTypes';
import axios from '../../axios';

export const fetchItemsSuccess = (items) => {
	return {
		type: actionTypes.FETCH_ITEMS_SUCCESS,
		items: items,
	};
};

export const fetchItemsFail = (error) => {
	return {
		type: actionTypes.FETCH_ITEMS_FAIL,
		error: error,
	};
};

export const fetchItemsStart = () => {
	return {
		type: actionTypes.FETCH_ITEMS_START,
	};
};

export const fetchItemsFromServer = () => {
	return (dispatch) => {
		dispatch(fetchItemsStart());
		axios
			.get('/items.json')
			.then((res) => {
				const fetchedItems = [];
				for (let item in res.data) {
					fetchedItems.push({
						...res.data[item],
						id: item,
					});
				}
				dispatch(fetchItemsSuccess(fetchedItems));
			})
			.catch((error) => {
				dispatch(fetchItemsFail(error));
			});
	};
};

export const inputHandler = (event) => {
	return {
		type: actionTypes.INPUT_ONCHANGED_HANDLER,
		event: event,
	};
};

export const categoryFilterHandler = (event) => {
	return {
		type: actionTypes.CATEGORY_FILTER_HANDLER,
		event: event,
	};
};

export const toggleActiveUpdating = (id) => {
	return {
		type: actionTypes.TOGGLE_UPDATING,
		id: id,
	};
};

export const toggleUpdatingFalse = () => {
	return {
		type: actionTypes.TOGGLE_UPDATING_FALSE,
	};
};
