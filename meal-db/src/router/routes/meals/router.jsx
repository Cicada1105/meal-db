import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { Meal } from './index.jsx';
import { RandomMeal } from './random_meal/index.jsx';
import { SearchMeal } from './search_meal/index.jsx';

class MealsRouter extends React.Component {
	render() {
		return(
			<Switch>
				<Route exact path="/Meal/Random" render={() => <RandomMeal />} />
				<Route path="/Meal/:mealId" render={() => <Meal />} />
				<Route path="/Meal/Search" render={() => <SearchMeal />} />
			</Switch>
		);
	}
}

export { MealsRouter }