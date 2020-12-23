import React, { Component } from 'react';
import Layout from './components/hoc/Layout/Layout';
import classes from './App.css';
import Itemsholder from './containers/ItemsHolder/Itemsholder';
import ItemBuilder from './containers/ItemBuilder/ItemBuilder';
// Routing
import { Route, Switch } from 'react-router-dom';

//Auth
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';

class App extends Component {
	render() {
		return (
			<div className={classes.ListHolder}>
				<Layout>
					<Switch>
						<Route path="/update" component={ItemBuilder} />
						<Route path="/add-new" component={ItemBuilder} />
						<Route path="/login" component={Auth} />
						<Route path="/logout" component={Logout} />
						<Route path="/" component={Itemsholder} />
					</Switch>
				</Layout>
			</div>
		);
	}
}

export default App;
