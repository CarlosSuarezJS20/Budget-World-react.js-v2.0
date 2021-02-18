import React from 'react';
import HeroSectionHomepage from './HeroSectionHomepage/HeroSectionHomepage';
import HomePageNavbar from './HomepageNavbar/HomepageNavbar';

const homePage = () => {
	return (
		<div>
			<HomePageNavbar />
			<HeroSectionHomepage />
		</div>
	);
};

export default homePage;
