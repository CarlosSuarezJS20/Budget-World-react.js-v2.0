import React, { Component } from 'react';
import classes from './ItemBuilder.css';
import Input from '../../../UI/Input/Input';
import Button from '../../../UI/Button/Button';
import axios from '../../../axios';

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
				validation: {
					required: true,
				},
				valid: false,
				touched: false,
			},
			imageURL: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
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
				validation: {
					required: true,
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
						{ value: 'empty', displayValue: '--' },
						{ value: 'Food-&-beverage', displayValue: 'food/beverage' },
						{ value: 'Activity', displayValue: 'Activity' },
						{ value: 'Transport', displayValue: 'Transport' },
						{ value: 'Souvenirs', displayValue: 'Souvenirs' },
						{ value: 'other', displayValue: 'Other' },
					],
				},
				value: 'empty',
				validation: {},
				valid: true,
			},
		},
		formIsValid: false,
		loading: false,
	};

	addItemHandler = (event) => {
		event.preventDefault();
		this.setState({ loading: true });

		const itemData = {};

		for (let formElementName in this.state.newItemForm) {
			itemData[formElementName] = this.state.newItemForm[formElementName].value;
		}

		console.log(itemData);

		const item = {
			image: itemData.imageURL,
			itemName: itemData.itemName,
			price: itemData.price,
			description: itemData.description,
			category: itemData.category,
			country: itemData.country,
		};

		axios
			.post('/items.json', item)
			.then((res) => {
				this.setState({ loading: true });
				console.log(res);
			})
			.catch((error) => {
				this.setState({ loading: true });
				console.log(error);
			});
	};

	// orderHandler = (event) => {
	// 	event.preventDefault();

	// 	const formData = {};
	// 	for (let formElementIdentifier in this.state.orderForm) {
	// 		formData[formElementIdentifier] = this.state.orderForm[
	// 			formElementIdentifier
	// 		].value;
	// 	}
	// 	const order = {
	// 		ingredients: this.props.ings,
	// 		price: this.props.price,
	// 		orderData: formData,
	// 	};

	// 	this.props.onOrderBurger(order);
	// };

	checkValidity(value, rules) {
		let isValid = true;
		if (!rules) {
			return true;
		}

		if (rules.required) {
			isValid = value.trim() !== '' && isValid;
		}

		if (rules.minLength) {
			isValid = value.length >= rules.minLength && isValid;
		}

		if (rules.maxLength) {
			isValid = value.length <= rules.maxLength && isValid;
		}

		if (rules.isNumeric) {
			const pattern = /^\d+$/;
			isValid = pattern.test(value) && isValid;
		}

		return isValid;
	}

	inputChangedHandler = (event, inputIdentifier) => {
		const updatedItemForm = {
			...this.state.newItemForm,
		};
		const updatedFormElement = {
			...updatedItemForm[inputIdentifier],
		};

		updatedFormElement.value = event.target.value;
		updatedFormElement.valid = this.checkValidity(
			updatedFormElement.value,
			updatedFormElement.validation
		);
		updatedFormElement.touched = true;
		updatedItemForm[inputIdentifier] = updatedFormElement;
		console.log(updatedItemForm[inputIdentifier]);

		let formIsValid = true;
		for (let inputIdentifier in updatedItemForm) {
			formIsValid = updatedItemForm[inputIdentifier].valid && formIsValid;
		}
		this.setState({ orderForm: updatedItemForm, formIsValid: formIsValid });
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
							changed={(event) =>
								this.inputChangedHandler(event, formElement.id)
							}
						/>
					);
				})}
				<Button clicked={this.addItemHandler}> add new </Button>
			</form>
		);

		return (
			<div className={classes.ItemBuilder}>
				<h4 className={classes.FormTitle}> Item Info </h4>
				{form}
			</div>
		);
	}
}

export default ItemBuilder;
