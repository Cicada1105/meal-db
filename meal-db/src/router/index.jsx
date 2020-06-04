import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { Routes } from './routes/index.jsx';

class MealDBRouter extends React.Component {
	render() {
		return(
			<Router>
				{/*		Links*		*/}
				{/*		Routes		*/}
				<Routes />
			</Router>
		);
	}
}

export { MealDBRouter } 