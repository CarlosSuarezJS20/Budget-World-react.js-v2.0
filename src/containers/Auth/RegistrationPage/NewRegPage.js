import React, { Component } from 'react';
import Input from '../../../components/UI/Input/Input';
import classes from './RegistrationPage.css';
import Logo from '../../../components/Logo/Logo';
import Spinner from '../../../components/UI/Spinner/Spinner';
import { Redirect } from 'react-router-dom';
import * as actions from '../../../store/actions/index';

import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

class Registration extends Component {
	state = {
		controlsAuth: {
			email: {
				elementType: 'input',
				elementConfig: {
					type: 'email',
					placeholder: 'Your Email Address',
				},
				value: '',
				validation: {
					required: true,
					isEmail: true,
				},
				valid: false,
				touched: false,
			},
			// imageURL: {
			// 	elementType: 'input',
			// 	elementConfig: {
			// 		type: 'file',
			// 		placeholder: 'imageURL',
			// 	},
			// 	value: '',
			// 	validation: {
			// 		required: true,
			// 	},
			// 	valid: false,
			// 	touched: false,
			// },
			password: {
				elementType: 'input',
				elementConfig: {
					type: 'password',
					placeholder: 'Enter Password',
				},
				value: '',
				length: 0,
				validation: {
					required: true,
					minLength: 7,
				},
				valid: false,
				touched: false,
			},
			confirmPassword: {
				elementType: 'input',
				elementConfig: {
					type: 'password',
					placeholder: 'Confirm Password',
				},
				value: '',
				length: 0,
				validation: {
					required: true,
					minLength: 7,
				},
				valid: false,
				touched: false,
			},
		},
		userImage: null,
	};

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

		if (rules.isEmail) {
			const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
			isValid = pattern.test(value) && isValid;
		}

		if (rules.isNumeric) {
			const pattern = /^\d+$/;
			isValid = pattern.test(value) && isValid;
		}

		return isValid;
	}

	inputChangedHandler = (event, controlName) => {
		if (event.target.files) {
			this.setState({ userImage: event.target.files[0] });
		}

		const copyOfRegistrationForm = { ...this.state.controlsAuth };

		const eachFormElementFromCopy = {
			...copyOfRegistrationForm[controlName],
		};

		eachFormElementFromCopy.value = event.target.value;
		eachFormElementFromCopy.length = event.target.value.length;

		eachFormElementFromCopy.valid = this.checkValidity(
			eachFormElementFromCopy.value.trim(),
			eachFormElementFromCopy.validation
		);

		this.setState({ controlsAuth: copyOfRegistrationForm });
	};

	submitHandler = (event) => {
		event.preventDefault();

		// if (!this.props.isCreatingAccount) {
		// 	this.props.onCreatingAccountStatus();
		// }

		if (
			this.state.controlsAuth.password.value ===
			this.state.controlsAuth.confirmPassword.value
		) {
			this.props.onAuth(
				this.state.controlsAuth.email.value,
				this.state.controlsAuth.password.value,
				this.props.isCreatingAccount,
				this.state.userImage
			);
			this.props.onConfirmPasswordHandler();
		} else {
			this.props.onConfirmPasswordHandler();
			return;
		}
	};

	render() {
		const formElementsArray = [];

		for (let key in this.state.controlsAuth) {
			formElementsArray.push({
				id: key,
				config: this.state.controlsAuth[key],
			});
		}

		let authenticationForm = formElementsArray.map((inputEl) => (
			<Input
				active
				key={inputEl.id}
				elementType={inputEl.config.elementType}
				elementConfig={inputEl.config.elementConfig}
				value={inputEl.config.value}
				invalid={!inputEl.config.valid}
				minCharacters={inputEl.config.validation.minLength}
				// saveImg={this.saveImage}
				uploadProgress={this.state.uploadImageProgress}
				imageSelected={this.state.image}
				passwordLength={inputEl.config.length}
				shouldValidate={inputEl.config.validation}
				touched={inputEl.config.touched}
				changed={(event) => this.inputChangedHandler(event, inputEl.id)}
			/>
		));

		if (this.props.loadingAuth) {
			authenticationForm = <Spinner />;
		}

		let errorMessage = null;
		let matchingPasswordError = null;

		if (this.props.errorAuth) {
			const message = this.props.errorAuth.message
				.replace(/_/g, ' ')
				.toLowerCase();
			errorMessage = (
				<p
					className={classes.ErrorMessage}
				>{`Sorry, ${message}. Please try again`}</p>
			);
		}

		if (!this.props.passwordNotConfirmed) {
			matchingPasswordError = (
				<p
					className={classes.ErrorMessage}
				>{`Password do not match. Please try again`}</p>
			);
		}

		let authRedirect = null;
		if (this.props.isAuthenticated) {
			authRedirect = <Redirect to="/discover" />;
		}

		return (
			<section className={classes.LoginSection}>
				<header>
					<div className={classes.HeroImage}></div>
				</header>
				<div className={classes.FormHolder}>
					<div className={classes.Auth}>
						{authRedirect}
						<div className={classes.LogoHolder}>
							<Logo active />
						</div>
						{errorMessage}
						{matchingPasswordError}
						<h2>Welcome to Budget World!</h2>
						{authenticationForm}
						<p
							style={{
								textAlign: 'center',
								paddingLeft: '10px',
								color: 'rgba(0, 0, 0, 0.712)',
								textTransform: 'capitalize',
							}}
						>
							password requires min. 7 characters
						</p>
						<div className={classes.BtnsHolder}>
							<button
								className={classes.AuthBtn}
								onClick={(e) => {
									this.submitHandler(e);
								}}
							>
								Sign Up
							</button>
						</div>
						<NavLink
							to="/login"
							className={classes.FormMessage}
							onClick={
								this.props.isCreatingAccount
									? this.props.onCreatingAccountStatus
									: null
							}
						>
							'Already a user? Login In'
						</NavLink>
					</div>
				</div>
			</section>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		errorAuth: state.authR.errorAuthentication,
		isCreatingAccount: state.authR.creatingAccount,
		loadingAuth: state.authR.loadingAuth,
		isAuthenticated: state.authR.token !== null,
		passwordNotConfirmed: state.authR.passwordNotConfirmed,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onAuth: (email, password, creatingAccount) =>
			dispatch(actions.auth(email, password, creatingAccount)),
		onCreatingAccountStatus: () =>
			dispatch(actions.creatingAccountStatusToggle()),
		onConfirmPasswordHandler: () => {
			dispatch(actions.confirmationPasswordHandler());
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Registration);
