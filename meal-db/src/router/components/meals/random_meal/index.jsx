import React from 'react';

class RandomMeal extends React.Component {
	componentDidMount() {
		console.log("RandomMeal component mounted...");
	}
	render() {
		return(
			<div>Random Meal</div>
		);
	}
}

export { RandomMeal }