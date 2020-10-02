import { 
	FILTER_BY_NAME, FILTER_BY_ID, FILTER_BY_CATEGORY, 
	FILTER_BY_INGREDIENT, FILTER_BY_AREA, GET_RANDOM_MEAL, 
	GET_CATEGORIES, GET_INGREDIENTS, GET_AREAS
} from '../actions.jsx';

export const mealsReducer = (state = [], action) => {
	switch(action.type) {
		case FILTER_BY_NAME:
		case FILTER_BY_ID:
			return [action.payload["mealRecipe"]]
		case FILTER_BY_CATEGORY:
		case FILTER_BY_INGREDIENT:
		case FILTER_BY_AREA:
			return [...action.payload["mealThumbnails"]]
		case GET_RANDOM_MEAL:
			return [action.payload["meal"]]
		case GET_INGREDIENTS:
			return [...action.payload["ingredients"]]
		case GET_CATEGORIES:
			return [...action.payload["categories"]]
		case GET_AREAS:
			return [...action.payload["areas"]]
		default:
			return state;
	}	
}