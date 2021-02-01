import React from 'react';
import bwLogo from '../../assets/images/images.png';
import classes from './Logo.css';

const logo = (props) => {
	return (
		<div className={props.LogoNavbar ? classes.LogoNavbar : classes.LogoHolder}>
			<img
				className={props.active ? classes.LogoLogin : classes.Logo}
				src={bwLogo}
				alt="BWLogo"
			/>
		</div>
	);
};

export default logo;
