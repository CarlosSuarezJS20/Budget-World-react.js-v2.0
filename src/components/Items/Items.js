import React from 'react';
import SingleItem from '../Items/SingleItem/SingleItem';

export const items = (props) =>
	props.items.map((item) => {
		return (
			<SingleItem
				key={item.id}
				id={item.id}
				image={item.image}
				title={item.itemName}
				price={item.price}
				description={item.description}
				category={item.category}
				country={item.country}
				userId={item.userId}
			/>
		);
	});

export default items;
