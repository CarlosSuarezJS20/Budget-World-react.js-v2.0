import React, { Component } from 'react';
import Input from '../../UI/Input/Input';
// redux
import * as actions from '../../../store/actions/index';
import { connect } from 'react-redux';

// helper function to delay the onchange
const debounceInput = (fn, delay) => {
	let timerId;
	return (...args) => {
		clearTimeout(timerId);
		timerId = setTimeout(() => fn(...args), delay);
	};
};

class Search extends Component {
	state = {
		type: '',
	};

	componentDidUpdate(prevProps, _prevState) {
		if (prevProps.search !== this.props.search) {
			this.responseHandler();
		}
	}

	cityOrCountrySearchHandler = () => {
		const itemsMappingForType = this.props.items.map((item) => item.country);
		if (itemsMappingForType.includes(this.props.search)) {
			this.setState({ type: 'country' });
		} else {
			this.setState({ type: 'city' });
		}
	};

	responseHandler = debounceInput(() => {
		this.cityOrCountrySearchHandler();
		this.props.onFetchItems(this.props.search, this.state.type);
	}, 1000);

	render() {
		return (
			<Input
				toolbar
				elementType={this.props.inputC.elementType}
				elementConfig={this.props.inputC.elementConfig}
				value={this.props.inputC.value}
				changed={(event) => this.props.onChangedHandler(event.target.value)}
			/>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		items: state.itemsR.items,
		inputC: state.filtersR.inputConfig,
		search: state.filtersR.search,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onChangedHandler: (eventValue) => dispatch(actions.inputHandler(eventValue)),
		onFetchItems: (search, category) =>
			dispatch(actions.fetchItemsFromServer(search, category)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
