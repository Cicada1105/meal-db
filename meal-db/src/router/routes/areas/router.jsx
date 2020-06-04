import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { Areas } from './index.jsx';
import { Area } from './area/index.jsx';

class AreasRouter extends React.Component {
	render() {
		return (
			<Switch>
				<Route exact path="/Areas" render={() => <Areas />} />
				<Route path="/Areas/:area" render={() => <Area />} />
			</Switch>
		)
	}
}

export { AreasRouter }