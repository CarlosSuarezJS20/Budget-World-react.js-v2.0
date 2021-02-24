import React, { Component } from 'react';
import HomePage from './components/HomePage/HomePage';
import Itemsholder from './containers/ItemsHolder/Itemsholder';
import ItemBuilder from './containers/ItemBuilder/ItemBuilder';
import ItemUpdate from './containers/ItemUpdate/ItemUpdate';
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
					<Route path="/update" component={ItemUpdate} />
					<Route path="/add-new" component={ItemBuilder} />
					<Route path="/discover" exact component={Itemsholder} />
					<Route path="/logout" component={Logout} />
					<Route path="/login" component={Auth} />
					<Route path="/" component={HomePage} />
				</Switch>
			</React.Fragment>
		);
	}
}

export default App;
