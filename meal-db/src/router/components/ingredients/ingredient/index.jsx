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
		const data = {
			meals: [
				{
			      strMeal: "Chick-Fil-A Sandwich",
			      strMealThumb: "https://www.themealdb.com/images/media/meals/sbx7n71587673021.jpg",
			      idMeal: 53016
    			},
			    {
			      strMeal: "Chicken Couscous",
			      strMealThumb: "https://www.themealdb.com/images/media/meals/qxytrx1511304021.jpg",
			      idMeal: 52850
			    },
			    {
			      strMeal: "Chicken Fajita Mac and Cheese",
			      strMealThumb: "https://www.themealdb.com/images/media/meals/qrqywr1503066605.jpg",
			      idMeal: 52818
			    },
			    {
			      strMeal: "Chicken Ham and Leek Pie",
			      strMealThumb: "https://www.themealdb.com/images/media/meals/xrrtss1511555269.jpg",
			      idMeal: 52875
			    }
			]
		}
		this.props.filterIngredient(data);
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