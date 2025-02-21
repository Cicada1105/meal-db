import React from 'react';
import { Route } from 'react-router';

// Components 
import Ingredients from './index.jsx';
import Ingredient from './ingredient/index.jsx';

function IngredientsRouter() {
	return (
		<Route path='Ingredients'>
			<Route index element={ <Ingredients /> } />
			<Route path=":ingredientID" element={ <Ingredient />} />
		</Route>
	)
}

export { IngredientsRouter }