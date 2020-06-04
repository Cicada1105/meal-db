import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { Categories } from './index.jsx';
import { Category } from './category/index.jsx';

class CategoriesRouter extends React.Component {
	render() {
		return (
			<Switch>
				<Route exact path="/Categories" render={() => <Categories />} />
				<Route path="/Categories/:category" render={() => <Category />} />
			</Switch>
		)
	}
}

export { CategoriesRouter }