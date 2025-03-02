import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import { connect } from 'react-redux';
import { filterIngredient } from '../../../../app_state/action_creators/filterActions.jsx';

import { PageHeader, ImageCard, ImageLoadingCards } from '../../../../static_components';
import styles from './index.module.css';

function Ingredient({ meals, filterIngredient }) {
	// Local state
	const [loading, setLoading] = useState(true);

	// Extract out necessary values from parameters
	const { ingredientID } = useParams();
	
	useEffect(() => {
		fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredientID}`)
			.then(response => response.json())
			.then(data => filterIngredient(data))
			.finally(() => setLoading(false));

		return () => {
			filterIngredient({meals: []});
		}
	},[filterIngredient, ingredientID]);

	return (
		<React.Fragment>
			<PageHeader>{ingredientID}</PageHeader>
			{
				loading ?
					<div className={styles.flexWrap}>
						<ImageLoadingCards />
					</div> : (
						meals.length === 0 ?
						<h3>Foods with "{ingredientID}" as an ingredient are not available</h3>
						:
						<div className={styles.flexWrap}>
						{
							meals.map(meal => 
								<ImageCard key={meal.idMeal} location={{
									from: `/Ingredients/${ingredientID}`,
									to: `/Meals/${meal.idMeal}`
								}} text={meal.strMeal} imageURL={meal.strMealThumb} />
							)
						}
						</div>
					)
			}
		</React.Fragment>
	);
}

const mapStateToProps = state => {
	return {
		meals: [...state.filterMealsReducer]
	}
}

export default connect(
	mapStateToProps,
	{ filterIngredient }
)(Ingredient)