import React from 'react';
import classes from './Layout.css';
import Aux from './Aux/Aux';
import Toolbar from '../../Navigation/Toolbar/Toolbar';

const layOut = (props) => (
	<Aux>
		<Toolbar />
		<main className={classes.Layout}>{props.children}</main>
	</Aux>
);

export default layOut;
