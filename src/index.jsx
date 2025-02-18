import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

import { Background } from './bg/background.jsx';
import { MealDB } from './router/index.jsx';

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { mealDBReducer } from './app_state/reducers/index.jsx';

const store = createStore(mealDBReducer);

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

const root = createRoot(document.getElementById('root'));
root.render(
	<Provider store={store}>
   		<App />
	</Provider>
);
