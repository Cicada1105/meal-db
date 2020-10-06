import React from 'react';

import { connect } from 'react-redux';
import { filterIngredient } from '../../../../app_state/action_creators/filterActions.jsx';

class Ingredient extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			ingredientID: props.match.params.ingredientID,
			meals: []
		}
	}
	componentDidMount() {
		fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${this.state.ingredientID}`)
			.then(response => response.json())
			.then(data => this.props.filterIngredient(data));
	}
	componentDidUpdate(prevProps,prevState) {
		if (prevState.meals.length === 0) {
			this.setState(function() {
				return {
					meals: [...this.props.meals]
				}
			})
		}
	}
	render() {
		return(
			<React.Fragment>
				<h2>Filter by IngredientID</h2>

				{ 
					this.state.meals.map((meal,id) => 
						<div key={id}>
							<label htmlFor="meal">Meal: </label>
							<span name="meal">
								{ meal["strMeal"] }
							</span><br />

							<label htmlFor="meal">Thumbnail: </label>
							<span name="meal">
								{ meal["strMealThumb"] }
							</span><br />

							<label htmlFor="meal">ID: </label>
							<span name="meal">
								{ meal["idMeal"] }
							</span><br /><br />
						</div>
					)
				}
			</React.Fragment>
		)
	}
}

const mapStateToProps = state => {
	return {
		meals: [...state.mealsReducer]
	}
}

export default connect(
	mapStateToProps,
	{ filterIngredient }
)(Ingredient)