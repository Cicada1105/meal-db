import React from 'react';

// Component Routes
import { AreasRouter } from './components/areas/router.jsx';
import { CategoriesRouter } from './components/categories/router.jsx';
import { HomeRouter } from './components/home/router.jsx';
import { IngredientsRouter } from './components/ingredients/router.jsx';
import { MealsRouter } from './components/meals/router.jsx';

function MealDBRoutes() {

	return(
		<React.Fragment>
			<MealsRouter />
			<IngredientsRouter />
			<AreasRouter />
			<CategoriesRouter />
			<HomeRouter />
		</React.Fragment>
	);
}

export { MealDBRoutes } 