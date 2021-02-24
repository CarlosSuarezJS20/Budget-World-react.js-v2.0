import React from 'react';
import HeroSectionHomepage from './HeroSectionHomepage/HeroSectionHomepage';
import HomePageNavbar from './HomepageNavbar/HomepageNavbar';

const homePage = () => {
	return (
		<React.Fragment>
			<HomePageNavbar />
			<HeroSectionHomepage />
		</React.Fragment>
	);
};

export default homePage;
