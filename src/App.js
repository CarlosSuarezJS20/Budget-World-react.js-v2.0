import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import Itemsholder from './containers/ItemsHolder/Itemsholder';
import ItemBuilder from './containers/ItemsHolder/ItemBuilder/ItemBuilder';

class App extends Component {
	render() {
		return (
			<div>
				<Layout>
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
