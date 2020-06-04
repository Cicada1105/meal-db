import React from 'react';

class Area extends React.Component {
	constructor(props) {
		super(props);

		// props.match.params.id will return ":id" appended to route
		this.state = {
			area: props.match.params.area
		}
	}
	render() {
		return(
			<div>{ this.state.area }</div>
		);
	}
}

export { Area }