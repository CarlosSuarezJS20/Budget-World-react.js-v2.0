import React, { Component } from 'react';
import classes from './Loader.css';

class Loader extends Component {
	componentDidMount() {
		setTimeout(() => {
			document.getElementById('loader').style.transition = 'opacity 5s';
			document.getElementById('loader').style.opacity = '0';
			setTimeout(() => {
				document.getElementById('loader').style.display = 'none';
			}, 2000);
		}, 100);
	}

	render() {
		return (
			<div className={classes.SpinnerHolder} id="loader">
				<div className={classes.Spinner}>loading...</div>
			</div>
		);
	}
}

export default Loader;
