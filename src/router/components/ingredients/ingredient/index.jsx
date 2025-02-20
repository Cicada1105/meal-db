import React, { useEffect, useState } from 'react';

import { connect } from 'react-redux';
import { filterIngredient } from '../../../../app_state/action_creators/filterActions.jsx';

import { NavButton, StyledButton, ImageCard, ImageLoadingCards } from '../../../../static_components';
import styles from './index.module.css';

function Ingredient({ meals, filterIngredient, history, match: { params } }) {
	// Extract out necessary values from parameters
	const { ingredientID } = params;

	// Local state
	const [loading, setLoading] = useState(true);
	
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
			<header className={styles.ingredientHeader}>
				<StyledButton onClickHandler={() => history.goBack()}>Go Back</StyledButton>
				<h2><ins>{ingredientID}</ins></h2>
				<NavButton text="Home" path="/Home" />
			</header>
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