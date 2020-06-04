import React from 'react';

class Meal extends React.Component {
	constructor(props) {
		super(props);

		// props.match.params.id will return ":id" appended to route
		this.state = {
			meal : props.match.params.mealId
		}
	}
	render() {
		return(
			<div>{ this.state.meal }</div>
		);
	}
}

export { Meal }