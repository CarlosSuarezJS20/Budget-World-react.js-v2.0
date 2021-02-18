import React, { useState } from 'react';
import classes from './HeroSectionHomepage.css';
import compass from '../../../assets/images/compass.jpeg';
import activities from '../../../assets/images/activities.jpeg';
import places from '../../../assets/images/places.jpeg';
import food from '../../../assets/images/food.jpeg';
import transport from '../../../assets/images/transport.jpeg';
import Typical from 'react-typical';

const HeroSectionHomepage = () => {
	const [background, setBackground] = useState(compass);
	const [title, setTitle] = useState('Explore a new place');

	const styleHeroImage = {
		height: '100vh',
		background: `
		url(${background}) center/cover no-repeat`,
	};

	const changeColorBlue = () => {
		setBackground(activities);
		setTitle('');
		setTitle('plan your activities');
	};

	const changeColorGreen = () => {
		setBackground(places);
		setTitle('find things to do');
	};

	const changeColorYellow = () => {
		setBackground(food);
		setTitle('taste new and exotic food');
	};

	const changeColorPurple = () => {
		setBackground(transport);
		setTitle('discovers how to get there');
	};
	return (
		<div className={classes.MainHeroDiv}>
			<div style={styleHeroImage}>
				<div className={classes.TitleHolder}>
					<h2>
						Budget <span className={classes.World}>World</span>
					</h2>
					<p>
						<Typical loop={Infinity} wrapper="b" steps={[title, 3000]} />
					</p>
					<div className={classes.BtnsHolder}>
						<button onClick={changeColorBlue} className={classes.Btn} />
						<button onClick={changeColorGreen} className={classes.Btn} />
						<button onClick={changeColorYellow} className={classes.Btn} />
						<button onClick={changeColorPurple} className={classes.Btn} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default HeroSectionHomepage;
