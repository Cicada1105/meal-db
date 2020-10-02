/*
	combineReducers allows for progrommatically separate reducers to be combined
	logically into one reducer used by the entire application store
*/
import { combineReducers } from 'redux';
import { loadingReducer } from './loading.jsx';
import { mealsReducer } from './meals.jsx';

export const mealDBReducer = combineReducers({ loadingReducer, mealsReducer });