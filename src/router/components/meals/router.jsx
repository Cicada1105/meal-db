import React from 'react';
import { Route } from 'react-router';

// Components 
import Meal from './index.jsx';
import RandomMeal from './random_meal/index.jsx';
import SearchMeal from './search_meal/index.jsx';

function MealsRouter() {
	return (
		<Route path='Meals'>
			<Route path="Random" element={ <RandomMeal /> } />
			<Route path="Search" element={ <SearchMeal /> } />
			<Route path=":mealID" element={ <Meal /> } />
		</Route>
	)
}

export { MealsRouter }