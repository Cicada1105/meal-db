import React from 'react';
import { Route } from 'react-router';

// Components 
import Categories from './index.jsx';
import Category from './category/index.jsx';

function CategoriesRouter() {
	return (
		<Route path='Categories'>
			<Route index element={ <Categories /> } />
			<Route path=":categoryID" element={ <Category /> } />
		</Route>
	)
}

export { CategoriesRouter }