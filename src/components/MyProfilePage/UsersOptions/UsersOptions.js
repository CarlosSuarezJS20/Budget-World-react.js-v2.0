import React, { useState } from 'react';
import classes from './UsersOptions.css';
import { NavLink } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const UsersOptions = () => {
	const [btnActive, setBtnActive] = useState(false);

	const optionsClickHandler = () => {
		if (btnActive) {
			setBtnActive(!btnActive);
		}
		setBtnActive(!btnActive);
	};

	const linksSectionStyle = {
		display: btnActive ? 'block' : 'none',
		textAlign: 'center',
	};

	return (
		<div className={classes.OptionsSection}>
			<div className={classes.OptionsBtnHolder}>
				<FontAwesomeIcon
					icon={faPlus}
					className={
						btnActive
							? [classes.OptionsBtn, classes.Active].join(' ')
							: classes.OptionsBtn
					}
					onClick={optionsClickHandler}
				/>
			</div>
			<div style={linksSectionStyle}>
				<h3 className={classes.Question}>What are you planning today?</h3>
				<div className={classes.LinksMenu}>
					<ul className={classes.LinksList}>
						<li>
							<NavLink
								to="/add-new"
								onClick={optionsClickHandler}
								className={classes.Link}
							>
								add a contribution
							</NavLink>
						</li>
						<li>
							<NavLink
								to="new-trip"
								onClick={optionsClickHandler}
								className={classes.Link}
							>
								plan a trip
							</NavLink>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
};

export default UsersOptions;
