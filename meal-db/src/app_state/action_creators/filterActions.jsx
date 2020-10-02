/*
	This file contains functions that will take in simple data and
	return an object used to successfully dispatch an action
*/
import { FILTER_BY_NAME, FILTER_BY_CATEGORY, FILTER_BY_INGREDIENT, FILTER_BY_AREA } from '../actions.jsx';

export const filterName = (response) => {
	return {
		type: FILTER_BY_NAME,
		payload: {
			mealRecipe: response.meals[0]
		}
	}
}
export const filterCategory = (response) => {
	return {
		type: FILTER_BY_CATEGORY,
		payload: {
			mealThumbnails: response["meals"]
		}
	}
}
export const filterIngredient = (response) => {
	return {
		type: FILTER_BY_INGREDIENT,
		payload: {
			mealThumbnails: response["meals"]
		}
	}
}
export const filterArea = (response) => {
	return {
		type: FILTER_BY_AREA,
		payload: {
			mealThumbnails: response["meals"]
		}
	}
}