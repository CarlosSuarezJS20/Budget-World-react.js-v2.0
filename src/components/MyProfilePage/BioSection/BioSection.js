import React, { useState } from 'react';
import classes from './BioSection.css';
import Input from '../../UI/Input/Input';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCameraRetro, faUser } from '@fortawesome/free-solid-svg-icons';

const BioSection = () => {
	const [addingBio, setAddingBio] = useState(false);
	const [bioMessage, setBio] = useState('');
	const [inputConfig, setInputConfig] = useState({
		elementType: 'textarea',
		elementConfig: {
			placeholder: 'Bio',
		},
		value: '',
		length: 0,
		validation: {
			required: true,
			maxLength: 100,
		},
		valid: false,
	});

	const checkValidity = (value, rules) => {
		let isValid = true;

		if (rules.minLength) {
			isValid = value.length >= rules.minLength && isValid;
		}

		if (rules.maxLength) {
			isValid = value.length <= rules.maxLength && isValid;
		}

		return isValid;
	};

	const addBio = () => {
		setAddingBio(true);
	};

	const saveBio = () => {
		setAddingBio(!addingBio);
		setBio(inputConfig.value);
		//request POST http
	};

	const cancelBioUpdate = () => {
		setAddingBio(!addingBio);
	};

	const textAreaChangedHandler = (e) => {
		const copyOfInputConfig = { ...inputConfig };
		copyOfInputConfig.value = e.target.value;
		copyOfInputConfig.length = e.target.value.length;
		copyOfInputConfig.valid = checkValidity(
			copyOfInputConfig.value.trim(),
			copyOfInputConfig.validation
		);

		setInputConfig(copyOfInputConfig);
	};

	const bio =
		bioMessage.length > 0 ? (
			<div className={classes.BioMessage}>
				<h3>{bioMessage}</h3>
				<div className={classes.EditBioBtnHolder}>
					<button onClick={addBio}>edit bio</button>
				</div>
			</div>
		) : (
			<div>
				<span>add travel bio</span>
				<button onClick={addBio}>add bio</button>
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
						maxCharacters={inputConfig.validation.maxLength}
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
