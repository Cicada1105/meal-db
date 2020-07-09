import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

// Style
import style from './home.module.css';
// MealDBRoutes
import { MealDBRoutes } from './router.jsx';

function MealDB() {
	return(
		<div className={ style.pgContent }>
			<Router>
				<MealDBRoutes />
			</Router>
		</div>
	);
}

export { MealDB } 