import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import { connect } from 'react-redux'
import { filterArea } from '../../../../app_state/action_creators/filterActions.jsx';

import { PageHeader, ImageCard, ImageLoadingCards } from '../../../../static_components';

function Area({ meals, filterArea }) {
	// Local state
	const [loading, setLoading] = useState(true);

	// Extract out necessary values from parameters
	const { areaID } = useParams();

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
			<PageHeader>{ areaID }</PageHeader>
			<div className='card-grid'>
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