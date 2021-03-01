import * as actionTypes from '../actions/actionTypes';
import { updateState } from './utility';

const initialState = {
	inputConfig: {
		elementType: 'input',
		elementConfig: {
			type: 'text',
			placeholder: 'Search by Country or City',
		},
		value: '',
	},
	search: '',
	category: '',
};

const inputOnchangedHandler = (state, action) => {
	const updatedSearchInput = { ...state.inputConfig };
	updatedSearchInput.value = action.eventValue;
	return updateState(state, {
		inputConfig: updatedSearchInput,
		search: updatedSearchInput.value.toUpperCase().trim(),
	});
};

const categoryFilterHandler = (state, action) => {
	return updateState(state, { category: action.event.target.value });
};

const categoryResettingHandler = (state) => {
	return updateState(state, { category: '' });
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.CATEGORY_FILTER_HANDLER:
			return categoryFilterHandler(state, action);
		case actionTypes.INPUT_ONCHANGED_HANDLER:
			return inputOnchangedHandler(state, action);
		case actionTypes.CATEGORY_RESETTING_HANDLER:
			return categoryResettingHandler(state);
		default:
			return state;
	}
};

export default reducer;
