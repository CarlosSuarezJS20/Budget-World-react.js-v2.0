import React, { useState, useCallback, useEffect } from 'react';
import classes from './BioSection.css';
import Input from '../../UI/Input/Input';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';

import axios from '../../../axios';

const BioSection = (props) => {
	const [addingBio, setAddingBio] = useState(false);
	const [bioMessage, setBio] = useState('');
	const [bioMessageLength, setBioMessageLength] = useState(0);
	const [inputConfig, setInputConfig] = useState({
		elementType: 'textarea',
		elementConfig: {
			placeholder: 'Bio',
		},
		value: '',
		length: 0,
		maxLength: 100,
		valid: false,
	});
	// HTTP Requests
	const [sendingRequest, setSendingRequest] = useState(false);

	const sendingHtppRequestForBioMessage = useCallback(async () => {
		let dataResponse;
		if (sendingRequest) {
			return;
		}
		try {
			dataResponse = await axios.post(
				'/users-bios.json?auth=' + props.token,
				bioMessage
			);
			if (dataResponse) {
				setSendingRequest(!sendingRequest);
			}
		} catch (error) {
			//do something with the error
		}
	}, []);

	useEffect(() => {
		return () => {
			setSendingRequest(!sendingRequest);
			console.log(sendingRequest);
		};
	}, []);

	const addBio = () => {
		setAddingBio(true);
		console.log(sendingRequest);
	};

	const editBio = () => {
		setAddingBio(true);
		let { value } = { ...inputConfig };
		value = bioMessage;
	};

	const saveBio = () => {
		setAddingBio(!addingBio);
		setBio(inputConfig.value.trim());
		setBioMessageLength(inputConfig.value.length);
		setSendingRequest(!sendingRequest);
	};

	const cancelBioUpdate = () => {
		setAddingBio(!addingBio);
	};

	const textAreaChangedHandler = (e) => {
		const copyOfInputConfig = { ...inputConfig };
		copyOfInputConfig.value = e.target.value;
		copyOfInputConfig.length = e.target.value.length;
		setInputConfig(copyOfInputConfig);
	};

	const bio =
		bioMessage.length > 0 ? (
			<div className={classes.BioMessage}>
				<h3>{bioMessage}</h3>
				<div className={classes.EditBioBtnHolder}>
					<button className={classes.BioBtn} onClick={editBio}>
						<FontAwesomeIcon className={classes.PencilBtn} icon={faPencilAlt} />
					</button>
				</div>
			</div>
		) : (
			<div className={classes.AddBioBtnHolder}>
				<span>travel bio</span>
				<button className={classes.BioBtn} onClick={addBio}>
					<FontAwesomeIcon className={classes.PencilBtn} icon={faPencilAlt} />
				</button>
			</div>
		);

	return (
		<div className={classes.BioSection}>
			{addingBio ? (
				<div className={classes.UserBio}>
					<Input
						bioSection
						key={inputConfig.elementType}
						elementType={inputConfig.elementType}
						elementConfig={inputConfig.elementConfig}
						value={inputConfig.value}
						valueLength={inputConfig.value.length}
						invalid={!inputConfig.valid}
						shouldValidate={inputConfig.validation}
						maxCharacters={inputConfig.maxLength}
						changed={(e) => {
							textAreaChangedHandler(e);
						}}
					/>
					<div className={classes.BioButtonHolder}>
						<button onClick={cancelBioUpdate}>cancel</button>
						<button onClick={saveBio}>save</button>
					</div>
				</div>
			) : (
				bio
			)}
		</div>
	);
};

export default BioSection;
