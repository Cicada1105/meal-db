import React from 'react';

// Data
import { linkData } from './data.jsx';
// Components
import { Row } from './row.jsx';

function Home() {
	return(
		<React.Fragment>
			<h2>MealDB</h2>
			{linkData.map((link,i) => 
				<Row key={i} btn={link.button} btnDir={ i % 2 } imgNum={link.imgNum} descr={link.description} />
			)}
		</React.Fragment>
	);
}

export { Home }