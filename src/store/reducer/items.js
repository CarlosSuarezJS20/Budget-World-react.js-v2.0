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
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		default:
			return state;
	}
};

export default reducer;
