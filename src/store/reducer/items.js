import * as actionTypes from '../actions/actionTypes';
import { updateState } from './utility';

const initialState = {
	items: [],
	inputConfig: {
		elementType: 'input',
		elementConfig: {
			type: 'text',
			placeholder: 'Search by Country',
		},
		value: '',
	},
	search: '',
	category: '',
	loading: false,
	updateElId: '',
	deleting: false,
	deleteItemId: null,
	requestedTooltip: false,
	tooltipElId: null,
};

const fetchItemsStart = (state) => {
	return updateState(state, { loading: true });
};

const fetchItemsSuccess = (state, action) => {
	return updateState(state, { items: action.items, loading: false });
};

const fetchItemsFail = (state) => {
	return updateState(state, { loading: false });
};

const inputOnchangedHandler = (state, action) => {
	const updatedSearchInput = { ...state.inputConfig };
	updatedSearchInput.value = action.event.target.value;
	return updateState(state, {
		inputConfig: updatedSearchInput,
		search: updatedSearchInput.value.toUpperCase(),
	});
};

const categoryFilterHandler = (state, action) => {
	return updateState(state, { category: action.event.target.value });
};

const toggleUpdating = (state, action) => {
	return updateState(state, { updateElId: action.id });
};

const updateItemSuccess = (state, action) => {
	const updatedItems = [...state.items];
	const indexOfUdatingItem = updatedItems.findIndex(
		(item) => item.id === action.id
	);
	updatedItems[indexOfUdatingItem] = action.item;

	return updateState(state, { items: updatedItems });
};

const updateItemFail = (state) => {
	return updateState(state);
};

const deletingItemStart = (state, action) => {
	return updateState(state, {
		deleting: true,
		deleteItemId: action.deletedItemId,
	});
};

const deleteItemSuccess = (state, action) => {
	const deletedItem = state.items.find((item) => item.id === action.id);
	const filteredItems = state.items.filter(
		(item) => item.id !== deletedItem.id
	);

	return updateState(state, {
		items: filteredItems,
		deleting: false,
		deleteItemId: null,
	});
};

const deleteItemFail = (state) => {
	return updateState(state, { deleting: false, deleteItemId: null });
};

const deleteItemCancel = (state) => {
	return updateState(state, { deleting: false });
};

// Deals with toolTip requests

const openTooltip = (state) => {
	return updateState(state, { requestedTooltip: true });
};

const closeTooltip = (state) => {
	return updateState(state, { requestedTooltip: false });
};

const itemIdForToolTip = (state, action) => {
	return updateState(state, { tooltipElId: action.elementId });
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.FETCH_ITEMS_START:
			return fetchItemsStart(state);
		case actionTypes.FETCH_ITEMS_SUCCESS:
			return fetchItemsSuccess(state, action);
		case actionTypes.FETCH_ITEMS_FAIL:
			return fetchItemsFail(state);
		case actionTypes.INPUT_ONCHANGED_HANDLER:
			return inputOnchangedHandler(state, action);
		case actionTypes.CATEGORY_FILTER_HANDLER:
			return categoryFilterHandler(state, action);
		case actionTypes.TOGGLE_UPDATING:
			return toggleUpdating(state, action);
		case actionTypes.UPDATE_ITEM_SUCCESS:
			return updateItemSuccess(state, action);
		case actionTypes.UPDATE_ITEM_FAIL:
			return updateItemFail(state);
		case actionTypes.DELETION_ITEM_START:
			return deletingItemStart(state, action);
		case actionTypes.DELETE_ITEM_SUCCESS:
			return deleteItemSuccess(state, action);
		case actionTypes.DELETE_ITEM_FAIL:
			return deleteItemFail(state, action);
		case actionTypes.DELETE_ITEM_CANCEL:
			return deleteItemCancel(state);
		case actionTypes.REQUESTED_TOOL_TIP:
			return openTooltip(state);
		case actionTypes.CLOSE_TOOL_TIP:
			return closeTooltip(state);
		case actionTypes.ITEM_ID_FOR_TOOL_TIP:
			return itemIdForToolTip(state, action);
		default:
			return state;
	}
};

export default reducer;
