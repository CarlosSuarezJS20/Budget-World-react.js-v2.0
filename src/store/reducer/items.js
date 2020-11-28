import * as actionTypes from '../actions/actionTypes';

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
	updating: false,
	updateElId: '',
	deleting: false,
	deleteItemId: null,
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.FETCH_ITEMS_START:
			return {
				...state,
				...{ loading: true },
			};
		case actionTypes.FETCH_ITEMS_SUCCESS:
			return {
				...state,
				...{ items: action.items, loading: false },
			};
		case actionTypes.FETCH_ITEMS_FAIL:
			return {
				...state,
				...{ loading: false },
			};
		case actionTypes.INPUT_ONCHANGED_HANDLER:
			const updatedSearchInput = {
				...state.inputConfig,
			};

			updatedSearchInput.value = action.event.target.value;
			return {
				...state,
				...{
					inputConfig: updatedSearchInput,
					search: updatedSearchInput.value.toUpperCase(),
				},
			};
		case actionTypes.CATEGORY_FILTER_HANDLER:
			return {
				...state,
				...{ category: action.event.target.value },
			};
		case actionTypes.TOGGLE_UPDATING:
			return {
				...state,
				...{ updating: true, updateElId: action.id },
			};
		case actionTypes.TOGGLE_UPDATING_FALSE:
			return {
				...state,
				...{ updating: false },
			};
		case actionTypes.UPDATE_ITEM_START:
			return {
				...state,
				...{ updating: true },
			};
		case actionTypes.UPDATE_ITEM_SUCCESS:
			return {
				...state,
				...{ updating: false },
			};
		case actionTypes.UPDATE_ITEM_FAIL:
			return {
				...state,
				...{ updating: false },
			};

		case actionTypes.DELETION_ITEM_START:
			return {
				...state,
				...{ deleting: true, deleteItemId: action.deletedItemId },
			};
		case actionTypes.DELETE_ITEM_SUCCESS:
			const deletedItem = state.items.find((item) => item.id === action.id);
			const filteredItems = state.items.filter(
				(item) => item.id !== deletedItem.id
			);

			return {
				...state,
				...{ items: filteredItems, deleting: false, deleteItemId: null },
			};
		case actionTypes.DELETE_ITEM_FAIL:
			return {
				...state,
				...{ deleting: false, deleteItemId: null },
			};
		case actionTypes.DELETE_ITEM_CANCEL:
			return {
				...state,
				...{ deleting: false },
			};

		default:
			return state;
	}
};

export default reducer;
