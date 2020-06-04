import React from 'react';

class Category extends React.Component {
	constructor(props) {
		super(props);

		// props.match.params.id will return ":id" appended to route
		this.state = {
			category: props.match.params.category
		}
	}
	render() {
		return(
			<div>{ this.state.category }</div>
		);
	}
}

export { Category }