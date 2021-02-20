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
