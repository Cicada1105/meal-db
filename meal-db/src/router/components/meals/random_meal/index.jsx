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
		fetch("https://www.themealdb.com/api/json/v1/1/random.php")
			.then(response => response.json())
			.then(data => this.props.getRandomMeal(data));
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

				<label htmlFor="id">ID: </label>
				<span name="id">
					{this.state.meal["idMeal"]}
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