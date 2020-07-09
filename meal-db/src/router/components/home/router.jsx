import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

// Components 
import { Home } from './index.jsx';

function HomeRouter() {
	return (
		<Switch>
			<Route exact path="/">
				<Redirect to="/Home" />
			</Route>
			<Route path="/Home" render={() => <Home /> } />
		</Switch>
	)
}

export { HomeRouter }