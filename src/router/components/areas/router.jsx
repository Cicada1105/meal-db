import React from 'react';
import { Switch, Route } from 'react-router-dom';

// Components 
import Areas from './index.jsx';
import Area from './area/index.jsx';

function AreasRouter() {
	return (
		<Switch>
			<Route exact path="/Areas" render={(routeProps) => <Areas {...routeProps}/>} />
			<Route path="/Areas/:areaID" render={(routeProps) => <Area {...routeProps}/>} />
		</Switch>
	)
}

export { AreasRouter }