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
		default:
			console.log(state);
			return state;
	}
};

export default reducer;
