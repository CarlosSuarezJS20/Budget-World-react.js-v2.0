import React, { Component } from 'react';
import classes from './ItemBuilder.css';
import Input from '../../../UI/Input/Input';

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
	};

	addItemHandler = (event) => {
		event.preventDefault();
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

	// checkValidity(value, rules) {
	// 	let isValid = true;
	// 	if (!rules) {
	// 		return true;
	// 	}

	// 	if (rules.required) {
	// 		isValid = value.trim() !== '' && isValid;
	// 	}

	// 	if (rules.minLength) {
	// 		isValid = value.length >= rules.minLength && isValid;
	// 	}

	// 	if (rules.maxLength) {
	// 		isValid = value.length <= rules.maxLength && isValid;
	// 	}

	// 	if (rules.isEmail) {
	// 		const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
	// 		isValid = pattern.test(value) && isValid;
	// 	}

	// 	if (rules.isNumeric) {
	// 		const pattern = /^\d+$/;
	// 		isValid = pattern.test(value) && isValid;
	// 	}

	// 	return isValid;
	// }

	// inputChangedHandler = (event, inputIdentifier) => {
	// 	const updatedOrderForm = {
	// 		...this.state.orderForm,
	// 	};
	// 	const updatedFormElement = {
	// 		...updatedOrderForm[inputIdentifier],
	// 	};
	// 	updatedFormElement.value = event.target.value;
	// 	updatedFormElement.valid = this.checkValidity(
	// 		updatedFormElement.value,
	// 		updatedFormElement.validation
	// 	);
	// 	updatedFormElement.touched = true;
	// 	updatedOrderForm[inputIdentifier] = updatedFormElement;

	// 	let formIsValid = true;
	// 	for (let inputIdentifier in updatedOrderForm) {
	// 		formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
	// 	}
	// 	this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid });
	// };

	render() {
		const formElementsArray = [];
		for (let key in this.state.newItemForm) {
			formElementsArray.push({
				id: key,
				config: this.state.newItemForm[key],
			});
		}
		console.log(formElementsArray);
		let form = (
			<form>
				{formElementsArray.map((formElement) => (
					<Input
						key={formElement.id}
						elementType={formElement.config.elementType}
						elementConfig={formElement.config.elementConfig}
						value={formElement.config.value}
						invalid={!formElement.config.valid}
						shouldValidate={formElement.config.validation}
						touched={formElement.config.touched}
						changed={(event) => this.inputChangedHandler(event, formElement.id)}
					/>
				))}
				<button onClick={this.addItemHandler}>ADD</button>
			</form>
		);

		return (
			<div className={classes.ItemBuilder}>
				<h4> Item Info </h4>
				{form}
			</div>
		);
	}
}

export default ItemBuilder;
