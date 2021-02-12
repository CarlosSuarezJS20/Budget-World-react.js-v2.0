import React, { Component } from 'react';
import classes from './ItemBuilder.css';
import Input from '../../components/UI/Input/Input';
import axios from '../../axios';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import { Redirect } from 'react-router-dom';
import FormsHeader from '../../components/UI/FormsHeader/FormsHeader';

// Firebase
import firebase from '../../firebase';

class ItemBuilder extends Component {
	state = {
		newItemForm: {
			itemName: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Item Name',
				},
				value: '',
				length: 0,
				validation: {
					required: true,
					maxLength: 50,
				},
				valid: false,
				touched: false,
			},
			imageURL: {
				elementType: 'input',
				elementConfig: {
					type: 'file',
					placeholder: 'imageURL',
				},
				value: '',
				validation: {
					required: true,
				},
				valid: false,
				touched: false,
			},
			country: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Country',
				},
				value: '',
				length: 0,
				validation: {
					required: true,
					maxLength: 30,
				},
				valid: false,
				touched: false,
			},
			price: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Price',
				},
				value: '',
				validation: {
					required: true,
					isNumeric: true,
				},
				valid: false,
				touched: false,
			},
			description: {
				elementType: 'textarea',
				elementConfig: {
					placeholder: 'description',
				},
				value: '',
				length: 0,
				validation: {
					required: true,
					minLength: 10,
					maxLength: 150,
				},
				valid: false,
				touched: false,
			},
			category: {
				elementType: 'select',
				elementConfig: {
					options: [
						{ value: '', displayValue: '- Select Category -' },
						{ value: 'Food & drinks', displayValue: 'Food & drinks' },
						{ value: 'Activities', displayValue: 'Activities' },
						{ value: 'Transport', displayValue: 'Transport' },
						{ value: 'Souvenirs', displayValue: 'Souvenirs' },
						{ value: 'other', displayValue: 'Other' },
					],
				},
				value: '',
				validation: {
					required: true,
				},
				valid: false,
			},
		},
		formIsValid: false,
		added: false,
		updated: false,
		valueLength: 0,
		image: null,
		uploadImageProgress: 0,
	};

	saveImage = () => {
		let bucketName = 'images';
		let file = this.state.image;
		let storageRef = firebase.storage().ref(`${bucketName}/${file.name}`);
		let uploadImage = storageRef.put(file);
		uploadImage.on(firebase.storage.TaskEvent.STATE_CHANGED, (snapshot) => {
			const progress = Math.round(
				(snapshot.bytesTransferred / snapshot.totalBytes) * 100
			);
			this.setState({ uploadImageProgress: progress });
		});
	};

	addItemHandler = (event) => {
		event.preventDefault();

		const itemData = {};
		let item = {};

		// All data from Inputs
		for (let formElementName in this.state.newItemForm) {
			itemData[formElementName] = this.state.newItemForm[formElementName].value;
		}

		// Image URL form Firebase
		let storageRef = firebase.storage().ref();
		let spaceRef = storageRef.child(`images/${this.state.image.name}`);
		storageRef
			.child(`images/${this.state.image.name}`)
			.getDownloadURL()
			.then((url) => {
				item = {
					image: url,
					itemName: itemData.itemName,
					price: +itemData.price,
					description: itemData.description,
					category: itemData.category,
					country: itemData.country.toUpperCase(),
					userId: this.props.userId,
				};

				axios
					.post('/items.json?auth=' + this.props.token, item)
					.then((res) => {
						this.setState({ added: true });
					})
					.catch((error) => {
						this.setState({ added: true });
					});

				this.setState({ added: false });
			});
	};

	checkValidity(value, rules) {
		let isValid = true;

		if (rules.required) {
			isValid = value !== '' && isValid;
		}

		if (rules.minLength) {
			isValid = value.length >= rules.minLength && isValid;
		}

		if (rules.maxLength) {
			isValid = value.length <= rules.maxLength && isValid;
		}

		if (rules.isNumeric) {
			const pattern = /^-?[\d.]+(?:e-?\d+)?$/;
			isValid = pattern.test(value) && isValid;
		}
		return isValid;
	}

	inputChangedHandler = (event, inputIdentifier) => {
		if (event.target.files) {
			this.setState({ image: event.target.files[0] });
		}

		const updatedItemForm = {
			...this.state.newItemForm,
		};
		const updatedFormElement = {
			...updatedItemForm[inputIdentifier],
		};

		updatedFormElement.value = event.target.value;
		updatedFormElement.length = event.target.value.length;

		updatedFormElement.valid = this.checkValidity(
			updatedFormElement.value.trim(),
			updatedFormElement.validation
		);
		updatedFormElement.touched = true;
		updatedItemForm[inputIdentifier] = updatedFormElement;

		let formIsValid = true;
		for (let inputIdentifier in updatedItemForm) {
			formIsValid = updatedItemForm[inputIdentifier].valid && formIsValid;
		}

		this.setState({ formIsValid: formIsValid });
		this.setState({ newItemForm: updatedItemForm });
	};

	render() {
		const formElementsArray = [];
		for (let key in this.state.newItemForm) {
			formElementsArray.push({
				id: key,
				config: this.state.newItemForm[key],
			});
		}

		let form = (
			<form>
				{formElementsArray.map((formElement) => {
					return (
						<Input
							key={formElement.id}
							elementType={formElement.config.elementType}
							elementConfig={formElement.config.elementConfig}
							value={formElement.config.value}
							invalid={!formElement.config.valid}
							shouldValidate={formElement.config.validation}
							touched={formElement.config.touched}
							maxCharacters={formElement.config.validation.maxLength}
							valueLength={formElement.config.length}
							saveImg={this.saveImage}
							uploadProgress={this.state.uploadImageProgress}
							imageSelected={this.state.image}
							changed={(event) => {
								this.inputChangedHandler(event, formElement.id);
							}}
						/>
					);
				})}
				{this.state.added || this.state.updated ? <Redirect to="/" /> : null}
				<p className={classes.ThankyouMessage}>
					thank you for your contribution!
				</p>
			</form>
		);

		return !this.props.isAuthenticated ? (
			<Redirect to="/login" />
		) : (
			<div className={classes.FormHolder}>
				<FormsHeader
					clicked={this.addItemHandler}
					disabled={
						!this.state.formIsValid || this.state.uploadImageProgress !== 100
					}
					name="new post"
				/>
				<div className={classes.ItemBuilder}>{form}</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		items: state.itemsR.items,
		updating: state.itemsR.updating,
		updateElId: state.itemsR.updateElId,
		token: state.authR.token,
		isAuthenticated: state.authR.token != null,
		userId: state.authR.userId,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onUpdatingItemInServer: (id, item, token) =>
			dispatch(actions.updateItemInServer(id, item, token)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemBuilder);
