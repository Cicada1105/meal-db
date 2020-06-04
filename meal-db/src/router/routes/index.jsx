import React from 'react';

import { HomeRouter } from './home/router.jsx';
import { MealsRouter } from './meals/router.jsx';
import { CategoriesRouter } from './categories/router.jsx';
import { IngredientsRouter } from './ingredients/router.jsx';
import { AreasRouter } from './areas/router.jsx';

class Routes extends React.Component {
	render() {
		return (
			<React.Fragment>
				<HomeRouter />
				<MealsRouter />
				<CategoriesRouter />
				<IngredientsRouter />
				<AreasRouter />
			</React.Fragment>
		);
	}
}

export { Routes }