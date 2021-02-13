import React from 'react';
import classes from './DeleteConfirmation.css';
import Modal from '../UI/Modal/Modal';

export const deleteConfirmation = (props) => {
	return (
		<Modal show={props.deletingShowModal} clicked={props.cancelled}>
			<p>Are you sure you want to delete this item? </p>
			<button className={classes.Btn} onClick={props.cancelled}>
				cancel
			</button>
			<button className={classes.Btn} onClick={props.confirmedDeletion}>
				confirm
			</button>
		</Modal>
	);
};

export default deleteConfirmation;
