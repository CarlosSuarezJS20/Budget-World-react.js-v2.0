import React, { useState, useCallback, useEffect } from 'react';
import classes from './BioSection.css';
import Input from '../../UI/Input/Input';
import MyProfileLoader from '../MyProfileLoader/MyProfileLoader';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';

import axios from '../../../axios';

// manage loading and errors //

const BioSection = (props) => {
	const [loading, setLoading] = useState(false);
	const [addingBio, setAddingBio] = useState(false);
	const [bioMessage, setBioMessage] = useState('');
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
	const [editing, setEditing] = useState(false);
	const [editingItemId, setEditingItemId] = useState('');
	// HTTP Requests
	const [sendingRequest, setSendingRequest] = useState(false);
	const sendingHtppRequestForBioMessage = useCallback(
		async (bioMessageObject) => {
			let dataResponse;
			if (sendingRequest) {
				return;
			}
			try {
				if (editing && bioMessageObject.bioMessage.length === 0) {
					dataResponse = await axios.delete(
						`/users-bios/${editingItemId}.json?auth=` + props.userToken
					);
				} else if (editing) {
					dataResponse = await axios.put(
						`/users-bios/${editingItemId}.json?auth=` + props.userToken,
						bioMessageObject
					);
				} else {
					dataResponse = await axios.post(
						'/users-bios.json?auth=' + props.userToken,
						bioMessageObject
					);
				}

				if (dataResponse) {
					if (editing && bioMessageObject.bioMessage.length === 0) {
						setEditingItemId('');
						setEditing(false);
					}
					if (editing) {
						setEditing(false);
					}
					if (editingItemId.length === 0) {
						setEditingItemId(dataResponse.data.name);
					}
					setBioMessage(bioMessageObject.bioMessage);
					setAddingBio(!addingBio);
					setSendingRequest(false);
				}
			} catch (error) {
				setSendingRequest(false);
				//do something with the error
				console.log(error);
			}
		},
		[sendingRequest, addingBio, editing, editingItemId]
	);

	useEffect(async () => {
		setLoading(true);
		let userMessage = {};
		try {
			const res = await axios.get(
				`users-bios.json?orderBy="id"&equalTo="${props.userId}"`
			);
			if (res.data) {
				for (let item in res.data) {
					userMessage = { itemId: item, ...res.data[item] };
					setBioMessage(userMessage.bioMessage);
					setEditingItemId(userMessage.itemId);
				}
				setLoading(false);
			}
		} catch (error) {
			setLoading(false);
		}
	}, []);

	const addBio = () => {
		setAddingBio(!addingBio);
	};

	const editBio = () => {
		setAddingBio(!addingBio);
		const copyInput = { ...inputConfig };
		copyInput.value = bioMessage;
		setInputConfig(copyInput);
		setEditing(true);
	};

	const saveBio = () => {
		const { value } = inputConfig;
		const bioMessageObject = {
			id: props.userId,
			bioMessage: value,
		};
		sendingHtppRequestForBioMessage(bioMessageObject);
		setSendingRequest(true);
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

	const bio = loading ? (
		<div className={classes.LoaderHolder}>
			<MyProfileLoader />
		</div>
	) : bioMessage.length > 0 ? (
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
					<div className={classes.LoaderSendingRequestHolder}>
						{sendingRequest ? <MyProfileLoader sendForm /> : null}
					</div>
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
