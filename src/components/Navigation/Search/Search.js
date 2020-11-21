import React, { Component } from 'react';
// import classes from './Search.css';
import Input from '../../UI/Input/Input';

class Search extends Component {
	state = {
		inputConfig: {
			elementType: 'input',
			elementConfig: {
				type: 'text',
				placeholder: 'Search by Country',
			},
			value: '',
		},
	};

	inputChangedHandler = (event) => {
		const updatedSearchInput = {
			...this.state.inputConfig,
		};

		updatedSearchInput.value = event.target.value;
		console.log(updatedSearchInput);

		this.setState({ inputConfig: updatedSearchInput });
	};

	render() {
		return (
			<Input
				elementType={this.state.inputConfig.elementType}
				elementConfig={this.state.inputConfig.elementConfig}
				value={this.state.inputConfig.value}
				changed={(event) => this.inputChangedHandler(event)}
			/>
		);
	}
}

export default Search;
