import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { Home } from './index.jsx';

class HomeRouter extends React.Component {
	render() {
		return(
			<Switch>
				<Route exact path="/Home" render={() => <Home />} />
			</Switch>
		);
	}
}

export { HomeRouter }