import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

// Data
//import { linkData } from './data.jsx';
// Components
//	Static 
//import Button from '../../../static_components/button.jsx';

function Home() {
	const location = useLocation();
	useEffect(() => {
		console.log("useEffect in Home functional component");
		console.log(location);
	});
	return(
		<React.Fragment>
			<div>MealDB</div>
			<Link to="/Categories">Categories</Link>
		</React.Fragment>
	);
}

export { Home }