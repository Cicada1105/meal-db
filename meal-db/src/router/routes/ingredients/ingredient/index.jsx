import React from 'react';

class Ingredient extends React.Component {
	constructor(props) {
		super(props);

		// props.match.params.id will return ":id" appended to route
		this.state = {
			ingredient: props.match.params.ingredient
		}
	}
	render() {
		return(
			<div>{ this.state.ingredient }</div>
		);
	}
}

export { Ingredient }