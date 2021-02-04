import React, { Component } from 'react';
import classes from './SingleItem.css';
import ImageHolder from './ImageHolder/ImageHolder';
import ItemInfo from './ItemInfo/ItemInfo';
import ItemFooter from './ItemFooter/ItemFooter';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';

import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

class SingleItem extends Component {
	render() {
		return (
			<article className={classes.Card} id={this.props.id}>
				{this.props.storedUserId === this.props.userId && (
					<div className={classes.ToggleOptionsHandler}>
						<FontAwesomeIcon
							icon={faEllipsisV}
							className={classes.ToggleSign}
							onClick={() => {
								this.props.onOpenTooltip();
								this.props.onElementIdForToolTip(this.props.id);
							}}
						/>
					</div>
				)}

				<ImageHolder image={this.props.image} />
				<ItemInfo
					itemName={this.props.title}
					itemPrice={this.props.price}
					itemDescription={this.props.description}
				/>
				<ItemFooter
					itemId={this.props.id}
					itemCategory={this.props.category}
					itemCountry={this.props.country}
					itemUserId={this.props.userId}
				/>
			</article>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		storedUserId: state.authR.userId,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onOpenTooltip: () => dispatch(actions.requestTooltipHandler()),
		onElementIdForToolTip: (id) => dispatch(actions.itemIdForTooltip(id)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleItem);
