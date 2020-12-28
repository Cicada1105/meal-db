import React from 'react';
import { Switch, Route } from 'react-router-dom';

// Components 
import Meal from './index.jsx';
import RandomMeal from './random_meal/index.jsx';
import SearchMeal from './search_meal/index.jsx';

function MealsRouter() {
	return (
		<Switch>
			<Route path="/Meals/Random" render={() => <RandomMeal /> } />
			<Route path="/Meals/Search" component={ SearchMeal } />
			<Route path="/Meals/:mealID" component={ Meal } />
		</Switch>
	)
}

export { MealsRouter }