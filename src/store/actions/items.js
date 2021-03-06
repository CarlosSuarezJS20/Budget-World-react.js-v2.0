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

export const fetchItemsFromServer = (search, type, userId) => {
	return (dispatch) => {
		let querybody;
		dispatch(fetchItemsStart());
		if (userId) {
			querybody = `?orderBy="userId"&equalTo="${userId}"`;
		} else {
			querybody =
				type === 'country'
					? `?orderBy="country"&equalTo="${search}"`
					: `?orderBy="city"&equalTo="${search}"`;
		}

		const query = search.length > 0 || userId ? querybody : '';
		axios
			.get('/items.json' + query)
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

export const categoryResettingHandler = () => {
	return {
		type: actionTypes.CATEGORY_RESETTING_HANDLER,
	};
};

export const toggleActiveUpdating = (id) => {
	return {
		type: actionTypes.TOGGLE_UPDATING,
		id: id,
	};
};

export const updateItemStart = () => {
	return {
		type: actionTypes.UPDATE_ITEM_START,
	};
};

export const updateItemSuccess = (res, id, item) => {
	return {
		type: actionTypes.UPDATE_ITEM_SUCCESS,
		res: res,
		id: id,
		item: item,
	};
};

export const updateItemFail = (error) => {
	return {
		type: actionTypes.UPDATE_ITEM_FAIL,
		error: error,
	};
};

export const updateItemInServer = (id, item, token) => {
	return (dispatch) => {
		dispatch(updateItemStart());
		axios
			.put(`/items/${id}.json?auth=` + token, item)
			.then((res) => {
				dispatch(updateItemSuccess(res, id, item));
			})
			.catch((error) => {
				dispatch(updateItemFail(error));
			});
	};
};

export const deletingItemStart = (id) => {
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

export const deletingItemInServer = (id, token) => {
	return (dispatch) => {
		axios
			.delete(`/items/${id}.json?auth=` + token)
			.then((res) => {
				dispatch(deletingItemSuccess(id));
			})
			.catch((error) => {
				dispatch(deletingItemFail(error));
			});
	};
};

export const deletedItemCancel = () => {
	return {
		type: actionTypes.DELETE_ITEM_CANCEL,
	};
};

// Update or Delete Tooltip:

export const requestTooltipHandler = () => {
	return { type: actionTypes.REQUESTED_TOOL_TIP };
};

export const closeTooltipHandler = () => {
	return { type: actionTypes.CLOSE_TOOL_TIP };
};

export const itemIdForTooltip = (id) => {
	return {
		type: actionTypes.ITEM_ID_FOR_TOOL_TIP,
		elementId: id,
	};
};
