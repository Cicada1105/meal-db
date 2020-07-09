import React from 'react';
import './App.css';

import { Background } from './bg/background.jsx';
import { MealDB } from './router/index.jsx';

class App extends React.Component {

	render() {
		return (
			<div className="App">
	    		<Background />
	    		<MealDB />
	    	</div>
		);
	}
}
export default App;
