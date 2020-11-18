/*
	combineReducers allows for progrommatically separate reducers to be combined
	logically into one reducer used by the entire application store
*/
import { combineReducers } from 'redux';
import { getMealsReducer } from './getMeals.jsx';
import { filterMealsReducer } from './filterMeals.jsx';

export const mealDBReducer = combineReducers({ getMealsReducer, filterMealsReducer });