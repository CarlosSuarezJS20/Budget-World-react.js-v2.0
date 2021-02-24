import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './FormsHeader.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faChevronLeft } from '@fortawesome/free-solid-svg-icons';

const formsHeader = (props) => {
	return (
		<header className={classes.FormHeader}>
			<NavLink to="/discover" onClick={props.clearFilter}>
				<FontAwesomeIcon icon={faChevronLeft} className={classes.Return} />
			</NavLink>
			<h2>{props.name}</h2>
			<button onClick={props.clicked} disabled={props.disabled}>
				<FontAwesomeIcon icon={faCheck} />
			</button>
		</header>
	);
};

export default formsHeader;
