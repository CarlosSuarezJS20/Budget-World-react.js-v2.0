import * as actionTypes from '../actions/actionTypes';
// combine the reducers, exporting Auth reducer

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
	updating: false,
	updateElId: '',
	deleting: false,
	deleteItemId: null,
	token: null,
	userId: null,
	errorAuthentication: null,
	loadingAuth: false,
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

		case actionTypes.AUTH_START:
			return {
				...state,
				...{ error: null, loadingAuth: true },
			};

		case actionTypes.AUTH_SUCCESS:
			return {
				...state,
				...{
					accountRegistered: true,
					token: action.idToken,
					userId: action.userId,
					errorAuthentication: null,
					loadingAuth: false,
				},
			};
		case actionTypes.AUTH_FAIL:
			return {
				...state,
				...{
					errorAuthentication: action.error,
					loadingAuth: false,
				},
			};

		case actionTypes.AUTH_LOGOUT:
			return {
				...state,
				...{ token: null, userId: null },
			};

		default:
			return state;
	}
};

export default reducer;
