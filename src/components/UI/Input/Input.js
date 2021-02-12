import React from 'react';
import classes from './Input.css';

const input = (props) => {
	let inputElement = null;
	let inputClasses;

	if (props.active) {
		inputClasses = [classes.Inputlogin];
	} else if (props.toolbar) {
		inputClasses = [classes.InputSearchToolbar];
	} else {
		inputClasses = [classes.InputElement];
	}

	if (props.invalid && props.shouldValidate && props.touched) {
		inputClasses.push(classes.Invalid);
	}

	switch (props.elementType) {
		case 'input':
			inputElement = (
				<input
					className={inputClasses.join(' ')}
					{...props.elementConfig}
					maxLength={props.maxCharacters}
					value={props.value}
					onChange={props.changed}
				/>
			);
			break;
		case 'textarea':
			inputElement = (
				<textarea
					className={inputClasses.join(' ')}
					{...props.elementConfig}
					value={props.value}
					maxLength={props.maxCharacters}
					onChange={props.changed}
				/>
			);
			break;
		case 'select':
			inputElement = (
				<select
					className={inputClasses.join(' ')}
					value={props.value}
					onChange={props.changed}
				>
					{props.elementConfig.options.map((option) => (
						<option key={option.value} value={option.value}>
							{option.displayValue}
						</option>
					))}
				</select>
			);
			break;
		default:
			inputElement = (
				<input
					className={inputClasses.join(' ')}
					{...props.elementConfig}
					value={props.value}
					maxLength={props.maxCharacters}
					onChange={props.changed}
				/>
			);
	}

	return (
		<div className={classes.Input}>
			{inputElement}
			{props.maxCharacters ? (
				<p
					style={{
						color:
							props.maxCharacters - props.valueLength === 0 ? 'red' : '#ffff',
					}}
				>{`max. lenght ${props.maxCharacters - props.valueLength}`}</p>
			) : null}
			{props.elementConfig.type === 'file' ? (
				<div className={classes.ProgressSection}>
					<div className={classes.ProgressbarHolder}>
						<label>{props.uploadProgress === 100 ? 'downloaded!' : ''}</label>
						<progress value={props.uploadProgress} max="100" />
					</div>
					<button
						onClick={(e) => {
							e.preventDefault();
							props.saveImg();
						}}
						disabled={props.imageSelected === null}
					>
						upload
					</button>
				</div>
			) : null}
		</div>
	);
};

export default input;
