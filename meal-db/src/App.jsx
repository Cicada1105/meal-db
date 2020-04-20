import React from 'react';
import './App.css';

import { Background } from './static/background';
import { Page } from './pgs/index.jsx';

class App extends React.Component {

	render() {
		return (
			<div className="App">
	    		<Background />
	    		<Page />
	    	</div>
		);
	}
}
export default App;
