import React, { Component } from 'react';
import Layout from './components/Layout/Layout';
import classes from './App.css';
import Itemsholder from './containers/ItemsHolder/Itemsholder';
import ItemBuilder from './containers/ItemBuilder/ItemBuilder';

class App extends Component {
	render() {
		return (
			<div className={classes.ListHolder}>
				<Layout>
					<div className={classes.ButtonsSection}>
						<button>Food/Beverage</button>
						<button>Activity</button>
						<button>Transport</button>
						<button>Souvenirs</button>
						<button>Others</button>
						<button>ALL</button>
					</div>
					<Itemsholder />
					<ItemBuilder />
					<div>
						<h1>Plan Your trip</h1>
					</div>
				</Layout>
			</div>
		);
	}
}

export default App;
