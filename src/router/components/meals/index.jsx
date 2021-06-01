import React from 'react';

import { connect } from 'react-redux';
import { filterID } from '../../../app_state/action_creators/filterActions.jsx';

import { RecipeCard } from '../../../static_components';

class Meal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: true,
			mealID: props.match.params.mealID,
			_meal: {}
		}
	}

	// Fetch meals
	componentDidMount() {
		fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${this.state.mealID}`)
			.then(response => response.json())
			.then(data => {
				this.props.filterID(data);
			});
	}
	componentDidUpdate(prevProps,prevState) {
		// Store retrieved meals into local state for formatting 
		if ((prevProps.meal.length === 0) && (this.props.meal.length === 1)) {
			let i = 1;
			let _meal = this.props.meal;
			let formattedStr = "";
			let isEmptyStr;
			let ingredients = [];
			do {
				isEmptyStr = (_meal[`strMeasure${i}`] === "") || (_meal[`strMeasure${i}`] === " ");
				formattedStr = _meal[`strIngredient${i}`] + (isEmptyStr ? "" : ` - ${_meal[`strMeasure${i}`]}`);
				ingredients.push(formattedStr);
				i++;
			} while((_meal[`strIngredient${i}`] !== "") && (_meal[`strIngredient${i}`] !== null) && (i <= 20));

			this.setState((prevState,currProps) => {
				let meal = currProps.meal[0];
				return ({
					isLoading: false,
					_meal: {
						strMeal: meal["strMeal"],
						strCategory: meal["strCategory"],
						strArea: meal["strArea"],
						strInstructions: meal["strInstructions"],
						strMealThumb: meal["strMealThumb"],
						strTags: meal["strTags"],
						strYoutube: meal["strYoutube"],
						strIngredients: [...ingredients],
						strSource: meal["strSource"]	
					}
				})
			});
		}
	}
	// Cleanup meal state 
	componenWillUnmount() {
		filterID({
			meals:[]
		});
	}

	render() {
		return (
			<React.Fragment>
			{
				this.state.isLoading ?
					<h2>Loading...</h2> :
					<RecipeCard {...this.state._meal} btnText="Home" btnPath="/Home" />
			}
			</React.Fragment>
		)
	}
}

const mapStateToProps = (state) => {
	return { meal: state.filterMealsReducer }
}

export default connect(
	mapStateToProps,
	{ filterID }
)(Meal)