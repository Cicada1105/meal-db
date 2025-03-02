import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import { connect } from 'react-redux';
import { filterID } from '../../../app_state/action_creators/filterActions.jsx';

import { RecipeCard } from '../../../static_components';

function Meal({ meal, filterID }) {
	// Extract out necessary values from parameters
	const { mealID } = useParams();
	// Local state
	const [loading, setLoading] = useState(true);
	const [_meal, setMeal] = useState({});

	useEffect(() => {
		fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
			.then(response => response.json())
			.then(data => filterID(data))
			.finally(() => setLoading(false));

		return () => {
			filterID({meals:[]});
		}
	},[filterID,mealID]);

	useEffect(() => {
		// Store retrieved meals into local state for formatting 
		if (meal && Object.keys(meal).length > 0) {
			let i = 1;
			let formattedStr = "";
			let isEmptyStr;
			let ingredients = [];
			let ingredient, measurement;
			do {
				ingredient = meal[`strIngredient${i}`];
				measurement = meal[`strMeasure${i}`];

				/*
					measurement?.trim()
						If measurement is '', ' ', null:
							measurement becomes '', '', undefined respectively
					!measurement?.trim()
						measurement becomes false -> isEmptyStr
				*/
				isEmptyStr = !measurement?.trim();
				formattedStr = ingredient + (isEmptyStr ? "" : ` - ${measurement}`);
				ingredients.push(formattedStr);
				i++;

			} while(meal[`strIngredient${i}`] && (i <= 20));

			setMeal(() => ({
				strMeal: meal["strMeal"],
				strCategory: meal["strCategory"],
				strArea: meal["strArea"],
				strInstructions: meal["strInstructions"],
				strMealThumb: meal["strMealThumb"],
				strTags: meal["strTags"],
				strYoutube: meal["strYoutube"],
				strIngredients: [...ingredients],
				strSource: meal["strSource"]
			}));
		}
	},[meal]);

	return (
		<React.Fragment>
		{
			loading ?
				<h2>Loading...</h2> :
				<RecipeCard {..._meal} />
		}
		</React.Fragment>
	);
}

const mapStateToProps = (state) => {
	return { meal: state.filterMealsReducer[0] }
}

export default connect(
	mapStateToProps,
	{ filterID }
)(Meal)