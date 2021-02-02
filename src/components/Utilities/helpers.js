export const debounce = (func, wait, immediate) => {
	let timeout;

	return () => {
		let context = this,
			args = arguments;
		let later = () => {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		let callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

export const activeColorChanger = (color) => {
	switch (color) {
		case 'ALL':
			return 'black';
		case 'Food & drinks':
			return 'rgba(233, 38, 38, 0.904)';
		case 'Transport':
			return 'rgb(34, 172, 226)';
		case 'Activities':
			return 'rgb(24, 124, 20)';
		case 'Souvenirs':
			return 'rgb(233, 153, 5)';
		case 'other':
			return 'rgb(145, 38, 145)';
		default:
			return null;
	}
};
