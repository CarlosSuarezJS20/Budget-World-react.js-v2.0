import React from 'react';
import classes from './Layout.css';
import Toolbar from '../../Navigation/Toolbar/Toolbar';

const layOut = (props) => (
	<React.Fragment>
		<Toolbar />
		<main className={classes.Layout}>{props.children}</main>
	</React.Fragment>
);

export default layOut;
