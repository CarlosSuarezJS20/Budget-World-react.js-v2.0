import React, { Component } from 'react';
import Input from '../../components/UI/Input/Input';
import classes from './Auth.css';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import Logo from '../../components/Logo/Logo';
import Spinner from '../../components/UI/Spinner/Spinner';
import { Redirect } from 'react-router-dom';

// fix the auth submit form.. bug displaying wrong button name

class Auth extends Component {
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
			password: {
				elementType: 'input',
				elementConfig: {
					type: 'password',
					placeholder: 'Enter Password',
				},
				value: '',
				validation: {
					required: true,
					minLength: 7,
				},
				valid: false,
				touched: false,
			},
		},
		creatingAccount: false,
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
		const updatedAuthForm = {
			...this.state.controlsAuth,
			[controlName]: {
				...this.state.controlsAuth[controlName],
				value: event.target.value,
				valid: this.checkValidity(
					event.target.value,
					this.state.controlsAuth[controlName].validation
				),
				touched: true,
			},
		};

		this.setState({ controlsAuth: updatedAuthForm });
	};

	submitHandler = (event) => {
		event.preventDefault();
		this.props.onAuth(
			this.state.controlsAuth.email.value,
			this.state.controlsAuth.password.value,
			this.state.creatingAccount
		);
	};

	switchAuthStatusHandler = (error) => {
		this.setState((prevState) => {
			return { creatingAccount: !prevState.creatingAccount, touched: false };
		});
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
				shouldValidate={inputEl.config.validation}
				touched={inputEl.config.touched}
				changed={(event) => this.inputChangedHandler(event, inputEl.id)}
			/>
		));

		if (this.props.loadingAuth) {
			authenticationForm = <Spinner />;
		}

		let errorMessage = null;

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

		let authRedirect = null;
		if (this.props.isAuthenticated) {
			authRedirect = <Redirect to="/" />;
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
						{this.state.creatingAccount ? (
							<h2>Welcome to Budget World!</h2>
						) : (
							<h2>Welcome back!</h2>
						)}
						{authenticationForm}
						{this.state.creatingAccount ? (
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
						) : null}

						<div className={classes.BtnsHolder}>
							<button
								className={classes.AuthBtn}
								onClick={(e) => {
									this.submitHandler(e);
								}}
							>
								{!this.state.creatingAccount ? 'Log In' : 'Sign Up'}
							</button>
						</div>
						<p
							className={classes.FormMessage}
							onClick={this.switchAuthStatusHandler}
						>
							{!this.state.creatingAccount
								? 'Register Here!'
								: 'Already a user? Login In'}
						</p>
					</div>
				</div>
			</section>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		errorAuth: state.authR.errorAuthentication,
		loadingAuth: state.authR.loadingAuth,
		isAuthenticated: state.authR.token !== null,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onAuth: (email, password, creatingAccount) =>
			dispatch(actions.auth(email, password, creatingAccount)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
