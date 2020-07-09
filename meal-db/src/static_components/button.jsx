import React from 'react';
import { withRouter } from 'react-router-dom';

class Button extends React.Component {
	render() {
		const { history } = this.props;
		return(
			<button onClick={() => history.push(this.props.link)}>{ this.props.name }</button>
		);
	}
}

export default withRouter(Button)