import React from 'react';
import classes from './MyProfileLoader.css';

const myProfileLoader = (props) => {
	let classList = classes.ldsEllipsis;

	if (props.sendForm) {
		classList = classes.sendFormLdsEllipsis;
	}

	return (
		<div className={classList}>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
		</div>
	);
};

export default myProfileLoader;
