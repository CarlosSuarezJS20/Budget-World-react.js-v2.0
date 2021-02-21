/* eslint-disable default-case */
import React, { useState, useRef, useEffect } from 'react';
import classes from './HeroSectionHomepage.css';
import compass from '../../../assets/images/compass.jpeg';
import activitiesPhoto from '../../../assets/images/activities.jpeg';
import placesPhoto from '../../../assets/images/places.jpeg';
import foodPhoto from '../../../assets/images/food.jpeg';
import transportPhoto from '../../../assets/images/transport.jpeg';
import { changeStyles, messageSwapper } from './HelperFunction';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

const HeroSectionHomepage = () => {
	const [buttonName, setButtonName] = useState('');
	const [buttonDownColor, setButtonDownColor] = useState('black');
	// paragh ref
	const initialMessage = useRef();
	const activitiesMessage = useRef();
	const placesMessage = useRef();
	const foodMessage = useRef();
	const transportMessage = useRef();

	const messagesRef = [
		initialMessage,
		activitiesMessage,
		placesMessage,
		foodMessage,
		transportMessage,
	];

	// Images Ref
	const initialImgRef = useRef();
	const activitiesImgRef = useRef();
	const placesImgRef = useRef();
	const foodImgRef = useRef();
	const transportImgRef = useRef();

	// exectute function
	const imagesRefs = [
		initialImgRef,
		activitiesImgRef,
		placesImgRef,
		foodImgRef,
		transportImgRef,
	];

	// btns refs

	const activitiesBtn = useRef();
	const placesBtn = useRef();
	const foodBtn = useRef();
	const transportBtn = useRef();

	useEffect(() => {
		initialMessage.current.style.opacity = 1;
		initialMessage.current.style.transform = 'translateY(0px)';

		const activitiesTimer = setTimeout(() => {
			activitiesBtn.current.click();
		}, 3000);
		const placesTimer = setTimeout(() => {
			placesBtn.current.click();
			places();
		}, 8000);
		const foodTimer = setTimeout(() => {
			foodBtn.current.click();
		}, 13000);
		const transportTimer = setTimeout(() => {
			transportBtn.current.click();
		}, 18000);
		const initialTimer = setTimeout(() => {
			messageSwapper('initial', messagesRef);
			changeStyles('initial', imagesRefs);
			transportBtn.current.style.background = 'rgb(185, 185, 185)';
		}, 23000);
		return () => {
			clearTimeout(activitiesTimer);
			clearTimeout(placesTimer);
			clearTimeout(transportTimer);
			clearTimeout(foodTimer);
			clearTimeout(initialTimer);
		};
	}, []);

	const activities = () => {
		messageSwapper('activities', messagesRef);
		changeStyles('activities', imagesRefs);
	};

	const places = () => {
		messageSwapper('places', messagesRef);
		changeStyles('places', imagesRefs);
	};

	const food = () => {
		messageSwapper('food', messagesRef);
		changeStyles('food', imagesRefs);
	};

	const transport = () => {
		messageSwapper('transport', messagesRef);
		changeStyles('transport', imagesRefs);
	};

	const activeBtn = (e) => {
		const btnName = e.target.name;
		switch (btnName) {
			case 'activities':
				setButtonName(btnName);
				setButtonDownColor('rgb(24, 124, 20)');
				activities();
				break;
			case 'places':
				setButtonName(btnName);
				setButtonDownColor('rgb(233, 153, 5)');
				places();
				break;
			case 'food':
				setButtonName(btnName);
				setButtonDownColor('rgb(233, 38, 38)');
				food();
				break;
			case 'transport':
				setButtonName(btnName);
				setButtonDownColor('rgb(34, 172, 226)');
				transport();
		}
	};

	return (
		<div className={classes.Hero}>
			<img
				ref={initialImgRef}
				src={compass}
				className={classes.HeroImage}
				id="initial"
				alt="image_url"
			/>
			<img
				ref={activitiesImgRef}
				src={activitiesPhoto}
				id="activities"
				className={classes.HeroImage1}
				alt="image_url"
			/>

			<img
				ref={placesImgRef}
				src={placesPhoto}
				id="places"
				className={classes.HeroImage2}
				alt="image_url"
			/>
			<img
				ref={foodImgRef}
				src={foodPhoto}
				id="food"
				className={classes.HeroImage3}
				alt="image_url"
			/>
			<img
				ref={transportImgRef}
				src={transportPhoto}
				id="transport"
				className={classes.HeroImage4}
				alt="image_url"
			/>

			<div className={classes.TitleHolder}>
				<h2>
					Budget <span className={classes.World}>World</span>
				</h2>
				<div className={classes.Container}>
					<div className={classes.Height}>
						<p
							ref={initialMessage}
							className={classes.Text}
							id="initial-message"
						>
							Explore new places!
						</p>
						<p
							ref={activitiesMessage}
							className={classes.Text}
							id="activities-message"
						>
							plan your activities
						</p>
						<p ref={placesMessage} className={classes.Text} id="places-message">
							find your next trip
						</p>
						<p ref={foodMessage} className={classes.Text} id="food-message">
							discover great food
						</p>
						<p
							ref={transportMessage}
							className={classes.Text}
							id="transport-message"
						>
							share your advetures!
						</p>
					</div>
				</div>
				<div className={classes.BtnsHolder}>
					<div className={classes.BtnsCover}></div>
					<button
						ref={activitiesBtn}
						name="activities"
						onClick={(e) => {
							activeBtn(e);
						}}
						className={
							buttonName === 'activities'
								? classes.ActivitiesBtnActive
								: classes.Btn
						}
					/>
					<button
						ref={placesBtn}
						name="places"
						onClick={(e) => {
							activeBtn(e);
						}}
						className={
							buttonName === 'places' ? classes.PlacesBtnActive : classes.Btn
						}
					/>
					<button
						ref={foodBtn}
						name="food"
						onClick={(e) => {
							activeBtn(e);
						}}
						className={
							buttonName === 'food' ? classes.FoodBtnActive : classes.Btn
						}
					/>
					<button
						ref={transportBtn}
						name="transport"
						onClick={(e) => {
							activeBtn(e);
						}}
						className={
							buttonName === 'transport'
								? classes.TransportBtnActive
								: classes.Btn
						}
					/>
				</div>
			</div>
			<div className={classes.BtnDownHolder}>
				<div className={classes.BtnDownHolderHeight}>
					<button
						className={classes.NextBtn}
						style={{
							background: buttonDownColor,
						}}
					>
						<FontAwesomeIcon icon={faChevronDown} className={classes.Arrow} />
					</button>
				</div>
			</div>
		</div>
	);
};

export default HeroSectionHomepage;
