import React from 'react';
import { connect } from 'react-redux';
import { getRandomMeal } from '../../../../app_state/action_creators/getActions.jsx';

class RandomMeal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			meal: {
				strMeal: "",
				strCategory: "",
				strArea: ""
			}
		};
	}
	componentDidMount() {
		const data = {
			meals:[
				{
					strMeal: "Egyptian Fatteh",
					strCategory: "Beef",
					strArea: "Egyptian"
				}
			]
		}
		// Cause update to Store
		this.props.getRandomMeal(data);
		// This will then cause the component to update
	}
	componentDidUpdate(prevProps,prevState) {
		if (prevState.meal.strMeal.localeCompare("") === 0) {
			this.setState(() => ({
				meal: this.props.meal
			}));
		}
	}
	render() {
		return(
			<React.Fragment>
				<h2>Random</h2>

				<label htmlFor="name">Meal: </label>
				<span name="name">
					{this.state.meal["strMeal"]}
				</span><br />

				<label htmlFor="category">Category: </label>
				<span name="category">
					{this.state.meal["strCategory"]}
				</span><br />

				<label htmlFor="area">Area: </label>
				<span name="area">
					{this.state.meal["strArea"]}
				</span><br />
			</React.Fragment>
		);
	}
}
const mapStateToProps = state => {
	return {meal: state.mealsReducer[0]}
}

export default connect(
	mapStateToProps,
	{ getRandomMeal }
)(RandomMeal)