import React from 'react';
import { Route, Navigate } from 'react-router';

// Components 
import { Home } from './index.jsx';

function HomeRouter() {
	return (
		<Route path=''>
			<Route index element={ <Navigate to="/Home" /> } />
			<Route path="/Home" element={ <Home /> } />
		</Route>
	)
}

export { HomeRouter }