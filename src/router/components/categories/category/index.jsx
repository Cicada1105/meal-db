import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import { connect } from 'react-redux';
import { filterCategory } from '../../../../app_state/action_creators/filterActions.jsx';

import { PageHeader, ImageCard, ImageLoadingCards } from '../../../../static_components';

function Category({ filterCategory, meals }) {
	// Local state
	const [loading, setLoading] = useState(true);

	// Extract out necessary values from parameters
	const { categoryID } = useParams();

	useEffect(() => {
		fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryID}`)
			.then(response => response.json())
			.then(data => filterCategory(data))
			.finally(() => setLoading(false));

		return () => {
			filterCategory({meals: []});
		}
	},[categoryID, filterCategory]);

	return(
		<React.Fragment>
			<PageHeader>{ categoryID }</PageHeader>
			<div className='card-grid'>
			{
				(loading || meals.length === 0) ?
					<ImageLoadingCards /> :
					meals.map((meal,i) =>
						<ImageCard key={i} location={{
							from:`/Categories/${categoryID}`,
							to:`/Meals/${meal["idMeal"]}`
						}} text={meal["strMeal"]} imageURL={meal["strMealThumb"]} />
					)
			}
			</div>
		</React.Fragment>
	)
}

const mapStateToProps = state => {
	return {
		meals: state.filterMealsReducer
	}
}

export default connect(
	mapStateToProps,
	{ filterCategory }
)(Category)