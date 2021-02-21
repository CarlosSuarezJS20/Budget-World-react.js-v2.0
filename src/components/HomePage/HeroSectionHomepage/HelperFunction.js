/* eslint-disable default-case */
export const changeStyles = (type, refs) => {
	switch (type) {
		case 'initial':
			for (let ref of refs) {
				if (ref.current.id === 'initial') {
					ref.current.style.opacity = 1;
				} else {
					ref.current.style.opacity = 0;
				}
			}
			break;
		case 'activities':
			for (let ref of refs) {
				if (ref.current.id === 'activities') {
					ref.current.style.opacity = 1;
				} else {
					ref.current.style.opacity = 0;
				}
			}
			break;
		case 'places':
			for (let ref of refs) {
				if (ref.current.id === 'places') {
					ref.current.style.opacity = 1;
				} else {
					ref.current.style.opacity = 0;
				}
			}
			break;
		case 'food':
			for (let ref of refs) {
				if (ref.current.id === 'food') {
					ref.current.style.opacity = 1;
				} else {
					ref.current.style.opacity = 0;
				}
			}
			break;
		case 'transport':
			for (let ref of refs) {
				if (ref.current.id === 'transport') {
					ref.current.style.opacity = 1;
				} else {
					ref.current.style.opacity = 0;
				}
			}
			break;
	}
};

export const messageSwapper = (type, refs) => {
	switch (type) {
		case 'initial':
			for (let ref of refs) {
				if (ref.current.id === 'initial-message') {
					ref.current.style.opacity = 1;
					ref.current.style.transform = 'translateY(0)';
				} else {
					ref.current.style.opacity = 0;
				}
			}
			break;
		case 'activities':
			for (let ref of refs) {
				if (ref.current.id === 'activities-message') {
					ref.current.style.color = 'rgb(24, 124, 20)';
					ref.current.style.opacity = 1;
					ref.current.style.transform = 'translateY(0)';
				} else {
					ref.current.style.opacity = 0;
				}
			}
			break;
		case 'places':
			for (let ref of refs) {
				if (ref.current.id === 'places-message') {
					ref.current.style.opacity = 1;
					ref.current.style.color = 'rgb(233, 153, 5)';
					ref.current.style.transform = 'translateY(0)';
				} else {
					ref.current.style.opacity = 0;
				}
			}
			break;
		case 'food':
			for (let ref of refs) {
				if (ref.current.id === 'food-message') {
					ref.current.style.opacity = 1;
					ref.current.style.color = 'rgb(233, 38, 38)';
					ref.current.style.transform = 'translateY(0)';
				} else {
					ref.current.style.opacity = 0;
				}
			}
			break;
		case 'transport':
			for (let ref of refs) {
				if (ref.current.id === 'transport-message') {
					ref.current.style.opacity = 1;
					ref.current.style.color = 'rgb(34, 172, 226)';
					ref.current.style.transform = 'translateY(0)';
				} else {
					ref.current.style.opacity = 0;
				}
			}
			break;
	}
};
