import React, { useEffect, useState } from 'react';

import { connect } from 'react-redux';
import { getRandomMeal } from '../../../../app_state/action_creators/getActions.jsx';

import { RecipeCard } from '../../../../static_components';

function RandomMeal({ meal, getRandomMeal }) {
	const [loading, setLoading] = useState(true);
	const [_meal, setMeal] = useState({});

	useEffect(() => {
		fetch("https://www.themealdb.com/api/json/v1/1/random.php")
			.then(response => response.json())
			.then(data => getRandomMeal(data))
			.finally(() => setLoading(false));

		return () => {
			getRandomMeal({meals: []});
		}
	},[getRandomMeal]);

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
				<RecipeCard {..._meal} btnText="Random" btnPath={() => document.location.reload()} />
		}
		</React.Fragment>
	);
}

const mapStateToProps = state => {
	return {meal: state.getMealsReducer[0]}
}

export default connect(
	mapStateToProps,
	{ getRandomMeal }
)(RandomMeal)