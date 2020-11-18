import React from 'react';

import { connect } from 'react-redux';
import { getRandomMeal } from '../../../../app_state/action_creators/getActions.jsx';

import { RecipeCard } from '../../../../static_components';

class RandomMeal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: true,
			meal: {
				strMeal: "",
				strCategory: "",
				strArea: "",
				strInstructions: "",
				strMealThumb: "",
				strTags: "",
				strYoutube: "",
				strIngredients: [],
				strSource: ""
			}
		};
	}
	componentDidMount() {
		fetch("https://www.themealdb.com/api/json/v1/1/random.php")
			.then(response => response.json())
			.then(data => this.props.getRandomMeal(data));
	}
	componentDidUpdate(prevProps,prevState) {
		if (prevState.meal["strMeal"].localeCompare("") === 0) {
			let i = 1;
			let formattedStr = "";
			let isEmptyStr;
			let ingredients = [];
			do {
				isEmptyStr = (this.props.meal[`strMeasure${i}`] === "") || (this.props.meal[`strMeasure${i}`] === " ");
				formattedStr = this.props.meal[`strIngredient${i}`] + (isEmptyStr ? "" : ` - ${this.props.meal[`strMeasure${i}`]}`);
				ingredients.push(formattedStr);
				i++;
			} while((this.props.meal[`strIngredient${i}`] !== "") && (this.props.meal[`strIngredient${i}`] !== null) && (i <= 20));

			this.setState(() => ({
				isLoading: false,
				meal: {
					strMeal: this.props.meal["strMeal"],
					strCategory: this.props.meal["strCategory"],
					strArea: this.props.meal["strArea"],
					strInstructions: this.props.meal["strInstructions"],
					strMealThumb: this.props.meal["strMealThumb"],
					strTags: this.props.meal["strTags"],
					strYoutube: this.props.meal["strYoutube"],
					strIngredients: [...ingredients],
					strSource: this.props.meal["strSource"]
				}
			}));
		}
	}
	render() {
		return(
			<React.Fragment>
			{
				this.state.isLoading ?
					<h2>Loading...</h2> :
					<RecipeCard meal={this.state.meal["strMeal"]} category={this.state.meal["strCategory"]} source={this.state.meal["strSource"]}
							area={this.state.meal["strArea"]} img={this.state.meal["strMealThumb"]} 
							ingredients={this.state.meal["strIngredients"]} instructions={this.state.meal["strInstructions"]} 
							tags={this.state.meal["strTags"]} />
			}
			</React.Fragment>
		);
	}
}
const mapStateToProps = state => {
	return {meal: state.getMealsReducer[0]}
}

export default connect(
	mapStateToProps,
	{ getRandomMeal }
)(RandomMeal)