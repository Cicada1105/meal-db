import React from 'react';

import { connect } from 'react-redux';
import { getIngredients } from '../../../app_state/action_creators/getActions.jsx';

class Ingredients extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			ingredients: []
		}
	}
	componentDidMount() {
		fetch("https://www.themealdb.com/api/json/v1/1/list.php?i=list")
			.then(response => response.json())
			.then(data => this.props.getIngredients(data));
	}
	componentDidUpdate(prevProps, prevState) {
		if (prevState["ingredients"].length === 0) {
			this.setState(function() {
				return {
					ingredients: [...this.props.meals]
				}
			})
		}
	}
	render() {
		return (
			<React.Fragment>
				<h2>MealDB Ingredients</h2>
				{
					this.state.ingredients.map(meal => 
						<div key={meal.idIngredient}>
							<label htmlFor="meal">Name: </label>
							<span name="meal">
								{ meal.strIngredient }
							</span><br />

							<label htmlFor="description">Description: </label>
							<span name="description">
								{ meal.strDescription }
							</span><br /><br />
						</div>
					)
				}
			</React.Fragment>
		);
	}
}

const mapStateToProps = state => {
	return {
		meals: [...state.mealsReducer]
	}
}

export default connect(
	mapStateToProps,
	{ getIngredients }
)(Ingredients);