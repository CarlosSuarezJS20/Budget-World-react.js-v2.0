import React, { Component } from 'react';
import Layout from './components/Layout/Layout';
import classes from './App.css';
import Itemsholder from './containers/ItemsHolder/Itemsholder';
import ItemBuilder from './containers/ItemBuilder/ItemBuilder';
import CategoriesFilterSection from './components/CategoriesSection/CategoriesFilterSection';

class App extends Component {
	render() {
		return (
			<div className={classes.ListHolder}>
				<Layout>
					<CategoriesFilterSection />
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
