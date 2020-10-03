import React from 'react';

import { connect } from 'react-redux'
import { filterArea } from '../../../../app_state/action_creators/filterActions.jsx';

class Area extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			areaID: props.match.params.areaID,
			meals: []
		}
	}
	componentDidMount() {
		console.log(`Area ID: ${this.state.areaID}`);
		const data = {
			meals: [
			    {
			      strMeal: "BeaverTails",
			      strMealThumb: "https://www.themealdb.com/images/media/meals/ryppsv1511815505.jpg",
			      idMeal: 52928
			    },
			    {
			      strMeal: "Breakfast Potatoes",
			      strMealThumb: "https://www.themealdb.com/images/media/meals/1550441882.jpg",
			      idMeal: 52965
			    },
			    {
			      strMeal: "Canadian Butter Tarts",
			      strMealThumb: "https://www.themealdb.com/images/media/meals/wpputp1511812960.jpg",
			      idMeal: 52923
			    },
			    {
			      strMeal: "Montreal Smoked Meat",
			      strMealThumb: "https://www.themealdb.com/images/media/meals/uttupv1511815050.jpg",
			      idMeal: 52927
			    }
			]
		}
		this.props.filterArea(data);
	}
	componentDidUpdate(prevProps,prevState) {
		if (prevState["meals"].length === 0) {
			this.setState(function() {
				return {
					meals: [...this.props.meals]
				}
			})
		}
	}
	render() {
		return (
			<React.Fragment>
				{
					this.state.meals.map(meal =>
						<div key={meal.idMeal}>
							<label htmlFor="meal">Meal: </label>
							<span name="meal">
								{ meal.strMeal }
							</span><br />
							<label htmlFor="id">Id: </label>
							<span name="id">
								{ meal.idMeal }
							</span><br />
							<label htmlFor="thumbnail">Thumbnail: </label>
							<span name="thumbnail">
								{ meal.strMealThumb }
							</span>
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
	{ filterArea }
)(Area);