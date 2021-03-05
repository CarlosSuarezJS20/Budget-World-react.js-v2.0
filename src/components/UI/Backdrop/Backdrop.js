import React, { useRef, useEffect } from 'react';
import classes from './Backdrop.css';

const backdrop = (props) => {
	const backDropRef = useRef(null);

	useEffect(() => {
		if (backDropRef.current !== null && props.show) {
			document.body.onresize = () => {
				if (backDropRef.current !== null) {
					backDropRef.current.click();
				}
			};
		}
	}, [backDropRef.current, props.show]);

	let classForBackdrop = classes.Backdrop;

	if (props.toolTipShow) {
		classForBackdrop = classes.BackdropForToolTip;
	}

	return props.show ? (
		<div
			ref={backDropRef}
			className={classForBackdrop}
			onClick={props.clicked}
			id="back-drop"
		></div>
	) : null;
};

export default backdrop;
