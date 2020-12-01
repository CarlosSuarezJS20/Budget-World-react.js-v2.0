import * as actionTypes from './actionTypes';
import axios from '../../axios';

// Fetching items for UI

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

export const fetchItemsFromServer = (token) => {
	return (dispatch) => {
		dispatch(fetchItemsStart());
		axios
			.get('/items.json?auth=' + token)
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

export const updateItemStart = () => {
	return {
		type: actionTypes.UPDATE_ITEM_START,
	};
};

export const updateItemSuccess = (res) => {
	return {
		type: actionTypes.UPDATE_ITEM_SUCCESS,
		res: res,
	};
};

export const updateItemFail = (error) => {
	return {
		type: actionTypes.UPDATE_ITEM_FAIL,
		error: error,
	};
};

export const updateItemInServer = (id, item) => {
	return (dispatch) => {
		console.log(id);
		dispatch(updateItemStart());
		axios
			.put(`/items/${id}.json`, item)
			.then((res) => {
				dispatch(updateItemSuccess(res));
			})
			.catch((error) => {
				dispatch(updateItemFail(error));
				console.log(error);
			});
	};
};

export const deletionItemStart = (id) => {
	return {
		type: actionTypes.DELETION_ITEM_START,
		deletedItemId: id,
	};
};

export const deletingItemSuccess = (id) => {
	return {
		type: actionTypes.DELETE_ITEM_SUCCESS,
		id: id,
	};
};

export const deletingItemFail = (error) => {
	return {
		type: actionTypes.DELETE_ITEM_FAIL,
		error: error,
	};
};

export const deletingItemInServer = (id) => {
	return (dispatch) => {
		axios
			.delete(`/items/${id}.json`)
			.then((res) => {
				dispatch(deletingItemSuccess(id));
				console.log(res);
			})
			.catch((error) => {
				dispatch(deletingItemFail(error));
				console.log(error);
			});
	};
};

export const deletedItemCancel = () => {
	return {
		type: actionTypes.DELETE_ITEM_CANCEL,
	};
};
