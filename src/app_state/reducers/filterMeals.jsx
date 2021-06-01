import { 
	FILTER_BY_NAME, FILTER_BY_ID, FILTER_BY_CATEGORY, 
	FILTER_BY_INGREDIENT, FILTER_BY_AREA
} from '../actions.jsx';

export const filterMealsReducer = (state = [], action) => {
	switch(action.type) {
		case FILTER_BY_NAME:
			return action.payload["meals"]
		case FILTER_BY_ID:
			return [action.payload["mealRecipe"]]
		case FILTER_BY_CATEGORY:
		case FILTER_BY_INGREDIENT:
		case FILTER_BY_AREA:
			return [...action.payload["mealThumbnails"]]
		default:
			return state;
	}	
}