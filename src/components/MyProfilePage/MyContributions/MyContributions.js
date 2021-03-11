import React, { Component } from 'react';
import classes from './MyContributions.css';
import * as actions from '../../../store/actions/index';
import { connect } from 'react-redux';
import SingleContributionImageHolder from '../../Items/SingleItem/ImageHolder/ImageHolder';
import MyProfileLoader from '../MyProfileLoader/MyProfileLoader';

import { NavLink } from 'react-router-dom';

export class MyContributions extends Component {
	componentDidMount() {
		this.props.onFetchingUserContributions('', '', this.props.userId);
	}

	render() {
		return (
			<div className={classes.ContributionsSection}>
				<div className={classes.ContributionsHolder}>
					<div
						className={
							this.props.items.length > 0
								? classes.Contributions
								: classes.ContributionEmptyHolder
						}
					>
						{this.props.loading ? (
							<div className={classes.LoaderHolder}>
								<MyProfileLoader />
							</div>
						) : this.props.items.length === 0 ? (
							<div className={classes.InfoAndAddNewHolder}>
								<h2>No Contributions</h2>
								<NavLink to="/add-new">add new</NavLink>
							</div>
						) : (
							this.props.items.map((item) => (
								<SingleContributionImageHolder
									profileItems
									key={item.id}
									image={item.image}
									city={item.city}
								/>
							))
						)}
					</div>
					{this.props.items.length > 0 && (
						<div className={classes.ContributionsTitleHolder}>
							<h3>your contributions</h3>
							<p>{`total contributions ${this.props.items.length}`}</p>
						</div>
					)}
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		items: state.itemsR.items,
		token: state.authR.token,
		userId: state.authR.userId,
		loading: state.itemsR.loading,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onFetchingUserContributions: (search, category, userId) => {
			dispatch(actions.fetchItemsFromServer(search, category, userId));
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(MyContributions);
