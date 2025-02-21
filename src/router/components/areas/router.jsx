import React from 'react';
import { Route } from 'react-router';

// Components 
import Areas from './index.jsx';
import Area from './area/index.jsx';

function AreasRouter() {
	return (
		<Route path='Areas'>
			<Route index element={ <Areas /> } />
			<Route path=":areaID" element={ <Area /> } />
		</Route>
	)
}

export { AreasRouter }