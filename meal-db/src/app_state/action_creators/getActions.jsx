/*
	This file contains functions that will take in simple data and
	return an object used to successfully dispatch an action
*/

import { GET_RANDOM_MEAL, GET_INGREDIENTS, GET_CATEGORIES, GET_AREAS } from '../actions.jsx';

export const getRandomMeal = (randomMeal) => {
	return {
		type: GET_RANDOM_MEAL,
		payload: {
			meal: randomMeal.meals[0]
		}
	}
}
export const getIngredients = (ingredientsDBResponse) => {
	return {
		type: GET_INGREDIENTS,
		payload: {
			ingredients: ingredientsDBResponse["meals"]
		}
	}
}
export const getCategories = (categoriesDBResponse) => {
	return {
		type: GET_CATEGORIES,
		payload: {
			categories: categoriesDBResponse["categories"]
		}
	}
}
export const getAreas = (areasDBResponse) => {
	return {
		type: GET_AREAS,
		payload: {
			areas: areasDBResponse["meals"]
		}
	}
}