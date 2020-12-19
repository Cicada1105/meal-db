import React from 'react';
import ReactDOM from 'react-dom';
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

ReactDOM.render(
	<Provider store={store}>
   		<App />
	</Provider>,
  document.getElementById('root')
);
