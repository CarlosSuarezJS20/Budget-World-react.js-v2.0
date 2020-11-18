import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';

class App extends Component {
	render() {
		return (
			<div>
				<Layout>
					<div>
						<h1>Items Holder</h1>
						<h2>Item</h2>
					</div>
					<div>
						<h1>Add New Form</h1>
					</div>
					<div>
						<h1>Plan Your trip</h1>
					</div>
				</Layout>
			</div>
		);
	}
}

export default App;
