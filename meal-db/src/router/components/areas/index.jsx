import React from 'react';

import { connect } from 'react-redux';
import { getAreas } from '../../../app_state/action_creators/getActions.jsx';

class Areas extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			areas: []
		}
	}
	componentDidMount() {
		const data = {
		    meals: [
			    {
			      strArea: "American"
			    },
			    {
			      strArea: "British"
			    },
			    {
			      strArea: "Canadian"
			    },
			    {
			      strArea: "Chinese"
			    },
			    {
			      strArea: "Dutch"
			    }
		    ]
		}

		this.props.getAreas(data);
	}
	componentDidUpdate(prevProps,prevState) {
		console.log(prevState);
		if (prevState["areas"].length === 0) {
			this.setState(function() {
				return {
					areas: [...this.props.meals]
				}
			})
		}
	}
	render() {
		return(
			<React.Fragment>
				<h2><ins>MealDB Areas</ins></h2>
				{
					this.state.areas.map((area, i) =>
						<section key={i}>
							<label htmlFor="area">Area: </label>
							<span name="area">{area["strArea"]}</span><br /><br />
						</section>
					)
				}
			</React.Fragment>
		);
	}
}

const mapStateToProps = state => {
	console.log(state.mealsReducer);
	return {
		meals: state.mealsReducer
	}
}

export default connect(
	mapStateToProps,
	{ getAreas }
)(Areas)