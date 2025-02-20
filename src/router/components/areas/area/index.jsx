import React, { useEffect, useState } from 'react';

import { connect } from 'react-redux'
import { filterArea } from '../../../../app_state/action_creators/filterActions.jsx';

import { NavButton, StyledButton, ImageCard, ImageLoadingCards } from '../../../../static_components';
import styles from './index.module.css';

function Area({ meals, filterArea, history, match: { params } }) {
	// Extract out necessary values from parameters
	const { areaID } = params;
	// Local state
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${areaID}`)
			.then(response => response.json())
			.then(data => filterArea(data))
			.finally(() => setLoading(false));

		return () => {
			filterArea({meals: []});
		}
	},[filterArea,areaID]);

	return (
		<React.Fragment>
			<header className={styles.areaHeader}>
				<StyledButton onClickHandler={() => history.goBack()}>Go Back</StyledButton>
				<h2><ins>{ areaID }</ins></h2>
				<NavButton text="Home" path="/Home" />
			</header>
			<div className={styles.flexWrap}>
			{
				loading ?
					<ImageLoadingCards /> :
					meals.map(meal =>
						<ImageCard key={meal.idMeal} location={{
							from: `/Areas/${areaID}`,
							to: `/Meals/${meal.idMeal}`
						}} text={meal.strMeal} imageURL={meal.strMealThumb} />
					)
			}
			</div>
		</React.Fragment>
	);
}

const mapStateToProps = state => {
	return {
		meals: state.filterMealsReducer
	}
}

export default connect(
	mapStateToProps,
	{ filterArea }
)(Area);