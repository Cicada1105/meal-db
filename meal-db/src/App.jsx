import React from 'react';
import './App.css';

import { Background } from './static/background.js';
import { MealDBRouter } from './router/index.jsx';

class App extends React.Component {

	render() {
		return (
			<div className="App">
	    		<Background />
	    		<MealDBRouter />
	    	</div>
		);
	}
}
export default App;
