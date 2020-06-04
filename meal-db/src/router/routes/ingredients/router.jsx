import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { Ingredients } from './index.jsx';
import { Ingredient } from './ingredient/index.jsx';

class IngredientsRouter extends React.Component {
	render() {
		return(
			<Switch>
				<Route exact path="/Ingredients" render={() => <Ingredients />} />
				<Route path="/Ingredients/:ingredient" render={() => <Ingredient />} />
			</Switch>
		)
	}
}

export { IngredientsRouter }