import React, { useState, useEffect } from 'react';

import { connect } from 'react-redux';
import { filterID } from '../../../app_state/action_creators/filterActions.jsx';

import { RecipeCard } from '../../../static_components';

const Meal = ({ filterID, match:{params:{mealID}}, meal }) => {
	// Initialize state
	let [isLoading, setLoadingState] = useState(true);
	let [_meal,setMeal] = useState({});

	// Hadle fetch request
	useEffect(() => {
		fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
			.then(response => response.json())
			.then(data => filterID(data));
	},[filterID,mealID])
	// Once store has been updated, update local state
	useEffect(() => {
		if (meal !== undefined) {
			let i = 1;
			let formattedStr = "";
			let isEmptyStr;
			let ingredients = [];
			do {
				isEmptyStr = (meal[`strMeasure${i}`] === "") || (meal[`strMeasure${i}`] === " ");
				formattedStr = meal[`strIngredient${i}`] + (isEmptyStr ? "" : ` - ${meal[`strMeasure${i}`]}`);
				ingredients.push(formattedStr);
				i++;
			} while((meal[`strIngredient${i}`] !== "") && (meal[`strIngredient${i}`] !== null) && (i <= 20));

			setLoadingState(false);
			setMeal({
				strMeal: meal["strMeal"],
				strCategory: meal["strCategory"],
				strArea: meal["strArea"],
				strInstructions: meal["strInstructions"],
				strMealThumb: meal["strMealThumb"],
				strTags: meal["strTags"],
				strYoutube: meal["strYoutube"],
				strIngredients: [...ingredients],
				strSource: meal["strSource"]
			})
		}

		// Cleanup 
		return () => {
			filterID({meals:[undefined]})
		}
	},[filterID,meal])

	return (
		<React.Fragment>
		{
			isLoading ?
				<h2>Loading...</h2> :
				<RecipeCard {..._meal} btnText="Home" btnPath="/Home" />
		}
		</React.Fragment>
	)
}

const mapStateToProps = (state) => {
	return { meal: state.filterMealsReducer[0] }
}

export default connect(
	mapStateToProps,
	{ filterID }
)(Meal)