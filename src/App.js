import React, { Component } from 'react';
import Itemsholder from './containers/ItemsHolder/Itemsholder';
import ItemBuilder from './containers/ItemBuilder/ItemBuilder';
import ItemUpdate from './containers/ItemUpdate/ItemUpdate';
// Routing
import { Route, Switch } from 'react-router-dom';

//Auth
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';

class App extends Component {
	render() {
		return (
			<React.Fragment>
				<Switch>
					<Route path="/update" component={ItemUpdate} />
					<Route path="/add-new" component={ItemBuilder} />
					<Route path="/login" component={Auth} />
					<Route path="/logout" component={Logout} />
					<Route path="/" component={Itemsholder} />
				</Switch>
			</React.Fragment>
		);
	}
}

export default App;
