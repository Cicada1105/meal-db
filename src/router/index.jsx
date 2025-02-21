import React from 'react';
import { BrowserRouter, Routes } from 'react-router';

// Style
import style from './home.module.css';
// MealDBRoutes
import { MealDBRoutes } from './router.jsx';

function MealDB() {
	return(
		<div className={ style.pgContent }>
			<BrowserRouter>
				<Routes>
					{MealDBRoutes()}
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export { MealDB } 