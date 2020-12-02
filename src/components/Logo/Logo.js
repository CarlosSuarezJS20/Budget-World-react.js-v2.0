import React from 'react';
import bwLogo from '../../assets/images/images.png';
import classes from './Logo.css';

const logo = () => (
	<div className={classes.LogoHolder}>
		<img className={classes.Logo} src={bwLogo} alt="BWLogo" />
	</div>
);

export default logo;
