import React from 'react';

import classes from './Backdrop.css';

const backdrop = (props) => {
	let classForBackdrop = classes.Backdrop;

	if (props.toolTipShow) {
		classForBackdrop = classes.BackdropForToolTip;
	}

	return props.show ? (
		<div className={classForBackdrop} onClick={props.clicked}></div>
	) : null;
};

export default backdrop;
