import React, { Component } from 'react';
import classes from './ItemUpdate.css';
import Input from '../../components/UI/Input/Input';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import { Redirect } from 'react-router-dom';
import FormsHeader from '../../components/UI/FormsHeader/FormsHeader';

class ItemUpdate extends Component {
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
			city: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'city',
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
		itemToUpdateImg: null,
		formIsValid: false,
		updated: false,
	};

	componentDidMount() {
		console.log(this.props);
		if (this.props.items.length !== 0) {
			const itemToUpdate = this.props.items.find((item) => {
				return item.id === this.props.updateElId;
			});

			const { image } = itemToUpdate;

			this.setState({ itemToUpdateImg: image });

			// Updates the item with previous values if it is updating
			const {
				itemName,
				imageURL,
				price,
				country,
				city,
				description,
				category,
			} = {
				...this.state.newItemForm,
			};

			itemName.value = itemToUpdate.itemName;
			imageURL.value = itemToUpdate.image;
			price.value = itemToUpdate.price;
			country.value = itemToUpdate.country;
			city.value = itemToUpdate.city;
			description.value = itemToUpdate.description;
			category.value = itemToUpdate.category;

			for (let element in this.state.newItemForm) {
				const newItemEl = this.state.newItemForm[element];
				newItemEl.valid = this.checkValidity(
					this.state.newItemForm[element].value,
					this.state.newItemForm[element].validation
				);
			}

			let formIsValid = false;

			for (let formElement in this.state.newItemForm) {
				formIsValid = this.state.newItemForm[formElement].valid && formIsValid;
			}

			this.setState({ formIsValid: formIsValid });
		}
	}

	updateItemHandler = (event) => {
		event.preventDefault();
		this.setState({ updated: true });

		const updatedItem = {
			image: this.state.newItemForm.imageURL.value,
			itemName: this.state.newItemForm.itemName.value,
			price: +this.state.newItemForm.price.value,
			description: this.state.newItemForm.description.value,
			category: this.state.newItemForm.category.value,
			country: this.state.newItemForm.country.value.toUpperCase(),
			city: this.state.newItemForm.city.value.toUpperCase(),
			userId: this.props.userId,
			id: this.props.updateElId,
		};

		this.props.onUpdatingItemInServer(
			this.props.updateElId,
			updatedItem,
			this.props.token
		);
		this.props.history.goBack();
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
			if (key !== 'imageURL' && key !== 'category')
				formElementsArray.push({
					id: key,
					config: this.state.newItemForm[key],
				});
		}

		let form = (
			<form className={classes.UpdateForm}>
				{formElementsArray.map((formElement) => {
					return (
						<Input
							key={formElement.id}
							itemUdateClass
							elementType={formElement.config.elementType}
							elementConfig={formElement.config.elementConfig}
							value={formElement.config.value}
							invalid={!formElement.config.valid}
							shouldValidate={formElement.config.validation}
							maxCharacters={formElement.config.validation.maxLength}
							valueLength={formElement.config.length}
							touched={formElement.config.touched}
							changed={(event) =>
								this.inputChangedHandler(event, formElement.id)
							}
						/>
					);
				})}
			</form>
		);

		return !this.props.isAuthenticated ? (
			<Redirect to="/login" />
		) : (
			<React.Fragment>
				<div className={classes.ItemUpdate}>
					<FormsHeader
						clearFilter={this.props.onClickReSettingCategory}
						clicked={this.updateItemHandler}
						name="Edit Post"
						disabled={!this.state.formIsValid}
					/>
					<div
						className={classes.ImageHolder}
						style={{
							background: `url(${this.state.itemToUpdateImg}) center/cover no-repeat`,
						}}
					></div>
					{form}
				</div>
			</React.Fragment>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		items: state.itemsR.items,
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
		onClickReSettingCategory: () => {
			dispatch(actions.categoryResettingHandler());
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemUpdate);
