import React from 'react';
import { Switch, Route } from 'react-router-dom';

// Components 
import Categories from './index.jsx';
import Category from './category/index.jsx';

function CategoriesRouter() {
	return (
		<Switch>
			<Route exact path="/Categories" render={() => <Categories /> } />
			<Route path="/Categories/:categoryID" component={Category} />
		</Switch>
	)
}

export { CategoriesRouter }