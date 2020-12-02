import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';

class Logout extends Component {
	componentDidMount() {
		this.props.onLogoutHandler();
	}
	render() {
		return <Redirect to="/login" />;
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onLogoutHandler: () => dispatch(actions.logout()),
	};
};

export default connect(null, mapDispatchToProps)(Logout);
