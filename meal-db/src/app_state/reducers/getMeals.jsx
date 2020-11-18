import { GET_RANDOM_MEAL, GET_CATEGORIES, GET_INGREDIENTS, GET_AREAS } from '../actions.jsx';

export const getMealsReducer = (state = [], action) => {
	switch(action.type) {
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