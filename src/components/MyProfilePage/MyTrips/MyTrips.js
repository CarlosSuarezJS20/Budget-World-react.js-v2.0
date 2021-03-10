import React, { useEffect, useState } from 'react';
import classes from './MyTrips.css';
import axios from '../../../axios';
import MyProfileLoader from '../MyProfileLoader/MyProfileLoader';

const MyTrips = (props) => {
	const [loading, setLoading] = useState(false);
	const [trips, setTrips] = useState([]);

	useEffect(async () => {
		setLoading(true);

		try {
			const res = await axios.get(
				`users-trips.json?orderBy="id"&equalTo="${props.userId}"`
			);
			if (res.data) {
				let tripsHelperVar = [];
				for (let item in res.data) {
					trips.push(item);
				}
				setTrips(tripsHelperVar);
				setLoading(false);
			}
		} catch (error) {
			setLoading(false);
		}
	}, []);

	return (
		<div className={classes.TripsHolder}>
			<div className={classes.Trips}>
				{loading ? (
					<div className={classes.TripsLoader}>
						<MyProfileLoader />
					</div>
				) : trips.length === 0 ? (
					<h2>No Upcoming trips</h2>
				) : (
					trips.map((trip) => {
						return <h1>{trip}</h1>;
					})
				)}
				<div className={classes.Title}>
					<h3>my trips</h3>
				</div>
			</div>
		</div>
	);
};

export default MyTrips;
