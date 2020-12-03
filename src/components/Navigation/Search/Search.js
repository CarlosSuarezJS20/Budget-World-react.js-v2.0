import React, { Component } from 'react';
// import classes from './Search.css';
import Input from '../../UI/Input/Input';
// redux
import * as actions from '../../../store/actions/index';
import { connect } from 'react-redux';

class Search extends Component {
	render() {
		console.log(this.props.inputC.elementType);
		return (
			<Input
				elementType={this.props.inputC.elementType}
				elementConfig={this.props.inputC.elementConfig}
				value={this.props.inputC.value}
				changed={(event) => this.props.onChangedHandler(event)}
			/>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		inputC: state.itemsR.inputConfig,
		search: state.itemsR.search,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onChangedHandler: (event) => dispatch(actions.inputHandler(event)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
