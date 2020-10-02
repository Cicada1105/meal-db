import React from 'react';
import { Switch, Route } from 'react-router-dom';

// Components 
import Ingredients from './index.jsx';
import Ingredient from './ingredient/index.jsx';

function IngredientsRouter() {
	return (
		<Switch>
			<Route exact path="/Ingredients" render={() => <Ingredients /> } />
			<Route path="/Ingredients/:ingredientID" component={Ingredient} />
		</Switch>
	)
}

export { IngredientsRouter }