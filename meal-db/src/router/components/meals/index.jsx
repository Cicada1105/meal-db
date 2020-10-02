import React from 'react';

import { connect } from 'react-redux';
import { filterID } from '../../../app_state/action_creators/filterActions.jsx';

class Meal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			mealID: this.props.match.params.mealID,
			meal: {
				strMeal: "",
				strCategory: "",
				strArea: ""
			}
		}
	}
	componentDidMount() {
		const data = {
			meals: [
				{
					strMeal: "Teriyaki Chicken Casserole",
					strCategory: "Chicken",
					strArea: "Japanese"
				}
			]
		}
		this.props.filterID(data);
	}
	componentDidUpdate(prevProps,prevState) {
		if (prevState.meal["strMeal"].localeCompare("") === 0) {
			this.setState(() => ({
				meal: this.props.meal
			}));
		}
	}
	render() {
		return (
			<React.Fragment>
				<h2>Select Meal by ID</h2>

				<label htmlFor="meal">ID: </label>
				<span name="meal">
					{ this.state.mealID}
				</span><br />

				<label htmlFor="meal">Name: </label>
				<span name="meal">
					{ this.state.meal["strMeal"]}
				</span><br />

				<label htmlFor="">Category: </label>
				<span name="">
					{ this.state.meal["strCategory"]}
				</span><br />

				<label htmlFor="">Area: </label>
				<span name="">
					{ this.state.meal["strArea"]}
				</span><br />
			</React.Fragment>
		)
	}
}

const mapStateToProps = (state) => {
	return { meal: state.mealsReducer[0] }
}

export default connect(
	mapStateToProps,
	{ filterID }
)(Meal)