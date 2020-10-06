import React from 'react';

import { connect } from 'react-redux';
import { filterName } from '../../../../app_state/action_creators/filterActions.jsx';

class SearchMeal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			meal: {
				strMeal: "",
				strCategory: "",
				strArea: ""
			}
		}
	}
	componentDidMount() {
		fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata")
			.then(response => response.json())
			.then(data => this.props.filterName(data));
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
				<h2>Search Meal</h2>

				<label htmlFor="meal">Meal: </label>
				<span name="meal">
					{this.state.meal["strMeal"]}
				</span><br />

				<label htmlFor="Category">Category: </label>
				<span name="Category">
					{this.state.meal["strCategory"]}
				</span><br />

				<label htmlFor="Area">Area: </label>
				<span name="Area">
					{this.state.meal["strArea"]}
				</span><br />
			</React.Fragment>
		);
	}
}

const mapStateToProps = state => {
	return {meal: state.mealsReducer[0]};
}
export default connect(
	mapStateToProps,
	{ filterName }
)(SearchMeal)