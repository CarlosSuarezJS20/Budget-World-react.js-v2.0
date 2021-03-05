import React, { Component } from 'react';
import HomePage from './components/HomePage/HomePage';
import Itemsholder from './containers/ItemsHolder/Itemsholder';
import ItemBuilder from './containers/ItemBuilder/ItemBuilder';
import ItemUpdate from './containers/ItemUpdate/ItemUpdate';
import RegistrationPage from './containers/Auth/RegistrationPage/RegistrationPage';
import MyProfile from '../src/components/MyProfilePage/MyProfilePage';
// Routing;
import { Route } from 'react-router-dom';

// Auth;
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';

class App extends Component {
	render() {
		return (
			<React.Fragment>
				<Route path="/update" component={ItemUpdate} />
				<Route path="/add-new" component={ItemBuilder} />
				<Route path="/logout" component={Logout} />
				<Route path="/sign-up" component={RegistrationPage} />
				<Route path="/login" component={Auth} />
				<Route path="/my-profile" component={MyProfile} />
				<Route path="/discover" exact component={Itemsholder} />
				<Route path="/" exact component={HomePage} />
			</React.Fragment>
		);
	}
}

export default App;
