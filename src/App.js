import React, { Component } from 'react';
import HomePage from './components/HomePage/HomePage';
import Itemsholder from './containers/ItemsHolder/Itemsholder';
import ItemBuilder from './containers/ItemBuilder/ItemBuilder';
import ItemUpdate from './containers/ItemUpdate/ItemUpdate';
import SignUp from './containers/Auth/RegistrationPage/RegistrationPage';
// Routing;
import { Route, Switch } from 'react-router-dom';

// Auth;
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';

class App extends Component {
	render() {
		return (
			<React.Fragment>
				<Switch>
					<Route path="/discover" component={Itemsholder} />
					<Route path="/update" component={ItemUpdate} />
					<Route path="/add-new" component={ItemBuilder} />
					<Route path="/logout" component={Logout} />
					<Route path="/sign-up" component={SignUp} />
					<Route path="/login" component={Auth} />
					<Route path="/" component={HomePage} />
				</Switch>
			</React.Fragment>
		);
	}
}

export default App;
