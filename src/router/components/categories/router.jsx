import React from 'react';
import { Switch, Route } from 'react-router-dom';

// Components 
import Categories from './index.jsx';
import Category from './category/index.jsx';

function CategoriesRouter() {
	return (
		<Switch>
			<Route exact path="/Categories" render={(routeProps) => <Categories {...routeProps}/> } />
			<Route path="/Categories/:categoryID" render={(routeProps) => <Category {...routeProps}/>} />
		</Switch>
	)
}

export { CategoriesRouter }