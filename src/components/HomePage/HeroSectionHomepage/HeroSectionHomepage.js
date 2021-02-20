/* eslint-disable default-case */
import React, { useRef, useEffect } from 'react';
import classes from './HeroSectionHomepage.css';
import compass from '../../../assets/images/compass.jpeg';
import activitiesPhoto from '../../../assets/images/activities.jpeg';
import placesPhoto from '../../../assets/images/places.jpeg';
import foodPhoto from '../../../assets/images/food.jpeg';
import transportPhoto from '../../../assets/images/transport.jpeg';
import { changeStyles } from './HelperFunction';
import { useState } from 'react/cjs/react.development';

const HeroSectionHomepage = () => {
	const [classesInitialMessage, setClassesInitialMessage] = useState([
		classes.Text,
	]);

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

	useEffect(() => {
		initialMessage.current.style.opacity = 1;
		const activitiesTimer = setTimeout(() => {
			activities();
		}, 5000);
		const placesTimer = setTimeout(() => {
			places();
		}, 10000);
		const foodTimer = setTimeout(() => {
			food();
		}, 15000);
		const transportTimer = setTimeout(() => {
			transport();
		}, 20000);
		const initialTimer = setTimeout(() => {
			for (let ref of messagesRef) {
				if (ref.current.id === 'initial-message') {
					ref.current.style.opacity = 1;
				} else {
					ref.current.style.opacity = 0;
				}
			}
			changeStyles('initial', imagesRefs);
		}, 25000);
		return () => {
			clearTimeout(activitiesTimer);
			clearTimeout(placesTimer);
			clearTimeout(transportTimer);
			clearTimeout(foodTimer);
			clearTimeout(initialTimer);
		};
	}, []);

	const activities = () => {
		for (let ref of messagesRef) {
			if (ref.current.id === 'activities-message') {
				ref.current.style.color = 'rgb(24, 124, 20)';
				ref.current.style.opacity = 1;
			} else {
				ref.current.style.opacity = 0;
			}
		}
		changeStyles('activities', imagesRefs);
	};

	const places = () => {
		for (let ref of messagesRef) {
			if (ref.current.id === 'places-message') {
				ref.current.style.opacity = 1;
				ref.current.style.color = 'rgb(233, 153, 5)';
			} else {
				ref.current.style.opacity = 0;
			}
		}
		changeStyles('places', imagesRefs);
	};

	const food = () => {
		for (let ref of messagesRef) {
			if (ref.current.id === 'food-message') {
				ref.current.style.opacity = 1;
				ref.current.style.color = 'rgb(233, 38, 38)';
			} else {
				ref.current.style.opacity = 0;
			}
		}
		changeStyles('food', imagesRefs);
	};

	const transport = () => {
		for (let ref of messagesRef) {
			if (ref.current.id === 'transport-message') {
				ref.current.style.opacity = 1;
				ref.current.style.color = 'rgb(34, 172, 226)';
			} else {
				ref.current.style.opacity = 0;
			}
		}
		changeStyles('transport', imagesRefs);
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
							className={classesInitialMessage.join(' ')}
							id="initial-message"
						>
							Explore new places!
						</p>
						<p
							ref={activitiesMessage}
							className={classesInitialMessage.join(' ')}
							id="activities-message"
						>
							plan your activities
						</p>
						<p
							ref={placesMessage}
							className={classesInitialMessage.join(' ')}
							id="places-message"
						>
							find your next trip
						</p>
						<p
							ref={foodMessage}
							className={classesInitialMessage.join(' ')}
							id="food-message"
						>
							discover great food
						</p>
						<p
							ref={transportMessage}
							className={classesInitialMessage.join(' ')}
							id="transport-message"
						>
							share your advetures!
						</p>
					</div>
				</div>
				<div className={classes.BtnsHolder}>
					<div className={classes.BtnsCover}></div>
					<button onClick={activities} className={classes.Btn} />
					<button onClick={places} className={classes.Btn} />
					<button onClick={food} className={classes.Btn} />
					<button onClick={transport} className={classes.Btn} />
				</div>
			</div>
		</div>
	);
};

export default HeroSectionHomepage;
