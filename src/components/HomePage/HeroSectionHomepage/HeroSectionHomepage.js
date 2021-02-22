/* eslint-disable default-case */
import React, { useState, useRef, useEffect } from 'react';
import classes from './HeroSectionHomepage.css';
import activitiesPhoto from '../../../assets/images/activities.jpeg';

import placesOne from '../../../assets/images/placesOne.jpg';
import placesTwo from '../../../assets/images/placesTwo.jpg';
import placesThree from '../../../assets/images/placesThree.jpg';
import placesFour from '../../../assets/images/placesFour.jpg';
import placesFive from '../../../assets/images/placesFive.jpg';
import placesSix from '../../../assets/images/placesSix.jpg';
import placesSeven from '../../../assets/images/placesSeven.jpg';
import placesEight from '../../../assets/images/placesEight.jpg';
import placesNine from '../../../assets/images/placesNine.jpg';
import placesTen from '../../../assets/images/placesTen.jpg';
import placesEleven from '../../../assets/images/placesEleven.jpg';
import placesTwelve from '../../../assets/images/placesTwelve.jpg';
import placesThirteen from '../../../assets/images/placesThirteen.jpg';
import placesFourteen from '../../../assets/images/placesFourteen.jpg';
import placesFifteen from '../../../assets/images/placesFifteen.jpg';
import placesSixteen from '../../../assets/images/placesSixteen.jpg';

import activityOne from '../../../assets/images/activityOne.jpg';
import activityTwo from '../../../assets/images/activityTwo.jpg';
import activityThree from '../../../assets/images/activityThree.jpg';
import activityFour from '../../../assets/images/activityFour.jpg';
import activityFive from '../../../assets/images/activityFive.jpg';
import activitySix from '../../../assets/images/activitySix.jpg';
import activitySeven from '../../../assets/images/activitySeven.jpg';
import activityEight from '../../../assets/images/activityEight.jpg';
import activityNine from '../../../assets/images/activityNine.jpg';
import activityTen from '../../../assets/images/activityTen.jpg';
import activityEleven from '../../../assets/images/activityEleven.jpg';
import activityTwelve from '../../../assets/images/activityTwelve.jpg';
import activityThirteen from '../../../assets/images/activityThirteen.jpg';
import activityFourteen from '../../../assets/images/activityFourteen.jpg';
import activityFifteen from '../../../assets/images/activityFifteen.jpg';
import activitySixteen from '../../../assets/images/activitySixteen.jpg';

import placesPhoto from '../../../assets/images/places.jpeg';
import foodPhoto from '../../../assets/images/food.jpeg';
import transportPhoto from '../../../assets/images/transport.jpeg';
import { changeStyles, messageSwapper } from './HelperFunction';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

const HeroSectionHomepage = () => {
	const [buttonName, setButtonName] = useState('');
	const [buttonDownColor, setButtonDownColor] = useState('');
	// paragh ref
	const activitiesMessage = useRef();
	const placesMessage = useRef();
	const foodMessage = useRef();
	const transportMessage = useRef();

	const messagesRef = [
		activitiesMessage,
		placesMessage,
		foodMessage,
		transportMessage,
	];

	// Images Ref
	const activitiesImgRef = useRef();
	const placesImgRef = useRef();
	const foodImgRef = useRef();
	const transportImgRef = useRef();

	// exectute function
	const imagesRefs = [
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
		activitiesBtn.current.click();

		const placesTimer = setTimeout(() => {
			placesBtn.current.click();
			places();
		}, 2500);
		const foodTimer = setTimeout(() => {
			foodBtn.current.click();
		}, 5000);
		const transportTimer = setTimeout(() => {
			transportBtn.current.click();
		}, 7500);
		const initialTimer = setTimeout(() => {
			// initialSetUp();
			activitiesBtn.current.click();
		}, 10000);
		return () => {
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
			<div
				ref={activitiesImgRef}
				id="activities"
				className={classes.HeroImage1}
			>
				<div className={classes.HeroDivOne}>
					<article className={classes.HeroImageContainer}>
						<img src={activityOne} className={classes.Image} alt="image_item" />
					</article>
					<article className={classes.HeroImageContainer}>
						<img
							src={activitySixteen}
							className={classes.Image}
							alt="image_item"
						/>
					</article>
				</div>
				<div className={classes.HeroDivTwo}>
					<article className={classes.HeroImageContainer}>
						<img src={activityTwo} className={classes.Image} alt="image_item" />
					</article>
					<article className={classes.HeroImageContainer}>
						<img
							src={activityFifteen}
							className={classes.Image}
							alt="image_item"
						/>
					</article>
				</div>
				<div className={classes.HeroDivThree}>
					<article className={classes.HeroImageContainer}>
						<img
							src={activityThree}
							className={classes.Image}
							alt="image_item"
						/>
					</article>
					<article className={classes.HeroImageContainer}>
						<img
							src={activityFour}
							className={classes.Image}
							alt="image_item"
						/>
					</article>
				</div>
				<div className={classes.HeroDivFour}>
					<article className={classes.HeroImageContainer}>
						<img
							src={activityFive}
							className={classes.Image}
							alt="image_item"
						/>
					</article>
					<article className={classes.HeroImageContainer}>
						<img src={activitySix} className={classes.Image} alt="image_item" />
					</article>
				</div>
				<div className={classes.HeroDivFive}>
					<article className={classes.HeroImageContainer}>
						<img
							src={activitySeven}
							className={classes.Image}
							alt="image_item"
						/>
					</article>
					<article className={classes.HeroImageContainer}>
						<img
							src={activityEight}
							className={classes.Image}
							alt="image_item"
						/>
					</article>
				</div>
				<div className={classes.HeroDivSix}>
					<article className={classes.HeroImageContainer}>
						<img
							src={activityNine}
							className={classes.Image}
							alt="image_item"
						/>
					</article>
					<article className={classes.HeroImageContainer}>
						<img src={activityTen} className={classes.Image} alt="image_item" />
					</article>
				</div>
				<div className={classes.HeroDivSeven}>
					<article className={classes.HeroImageContainer}>
						<img
							src={placesEleven}
							className={classes.Image}
							alt="image_item"
						/>
					</article>
					<article className={classes.HeroImageContainer}>
						<img
							src={activityTwelve}
							className={classes.Image}
							alt="image_item"
						/>
					</article>
				</div>
				<div className={classes.HeroDivEight}>
					<article className={classes.HeroImageContainer}>
						<img
							src={activityThirteen}
							className={classes.Image}
							alt="image_item"
						/>
					</article>
					<article className={classes.HeroImageContainer}>
						<img
							src={activityFourteen}
							className={classes.Image}
							alt="image_item"
						/>
					</article>
				</div>
			</div>
			{/* <img
				ref={placesImgRef}
				src={placesPhoto}
				id="places"
				className={classes.HeroImage2}
				alt="image_url"
			/> */}
			<div ref={placesImgRef} id="places" className={classes.HeroImage2}>
				<div className={classes.HeroDivOne}>
					<article className={classes.HeroImageContainer}>
						<img src={placesOne} className={classes.Image} alt="image_item" />
					</article>
					<article className={classes.HeroImageContainer}>
						<img
							src={placesSixteen}
							className={classes.Image}
							alt="image_item"
						/>
					</article>
				</div>
				<div className={classes.HeroDivTwo}>
					<article className={classes.HeroImageContainer}>
						<img src={placesTwo} className={classes.Image} alt="image_item" />
					</article>
					<article className={classes.HeroImageContainer}>
						<img
							src={placesFifteen}
							className={classes.Image}
							alt="image_item"
						/>
					</article>
				</div>
				<div className={classes.HeroDivThree}>
					<article className={classes.HeroImageContainer}>
						<img src={placesThree} className={classes.Image} alt="image_item" />
					</article>
					<article className={classes.HeroImageContainer}>
						<img src={placesFour} className={classes.Image} alt="image_item" />
					</article>
				</div>
				<div className={classes.HeroDivFour}>
					<article className={classes.HeroImageContainer}>
						<img src={placesFive} className={classes.Image} alt="image_item" />
					</article>
					<article className={classes.HeroImageContainer}>
						<img src={placesSix} className={classes.Image} alt="image_item" />
					</article>
				</div>
				<div className={classes.HeroDivFive}>
					<article className={classes.HeroImageContainer}>
						<img src={placesSeven} className={classes.Image} alt="image_item" />
					</article>
					<article className={classes.HeroImageContainer}>
						<img src={placesEight} className={classes.Image} alt="image_item" />
					</article>
				</div>
				<div className={classes.HeroDivSix}>
					<article className={classes.HeroImageContainer}>
						<img src={placesNine} className={classes.Image} alt="image_item" />
					</article>
					<article className={classes.HeroImageContainer}>
						<img src={placesTen} className={classes.Image} alt="image_item" />
					</article>
				</div>
				<div className={classes.HeroDivSeven}>
					<article className={classes.HeroImageContainer}>
						<img
							src={activityEleven}
							className={classes.Image}
							alt="image_item"
						/>
					</article>
					<article className={classes.HeroImageContainer}>
						<img
							src={placesTwelve}
							className={classes.Image}
							alt="image_item"
						/>
					</article>
				</div>
				<div className={classes.HeroDivEight}>
					<article className={classes.HeroImageContainer}>
						<img
							src={placesThirteen}
							className={classes.Image}
							alt="image_item"
						/>
					</article>
					<article className={classes.HeroImageContainer}>
						<img
							src={placesFourteen}
							className={classes.Image}
							alt="image_item"
						/>
					</article>
				</div>
			</div>
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
