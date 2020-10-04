import React from 'react';

import { connect } from 'react-redux';
import { filterCategory } from '../../../../app_state/action_creators/filterActions.jsx';

class Category extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			categoryID: props.match.params.categoryID,
			meals: []
		}
	}
	componentDidMount() {
		const data = {
			meals: [
			    {
			      strMeal: "Baked salmon with fennel & tomatoes",
			      strMealThumb: "https://www.themealdb.com/images/media/meals/1548772327.jpg",
			      idMeal: "52959"
			    },
			    {
			      strMeal: "Cajun spiced fish tacos",
			      strMealThumb: "https://www.themealdb.com/images/media/meals/uvuyxu1503067369.jpg",
			      idMeal: "52819"
			    },
			    {
			      strMeal: "Escovitch Fish",
			      strMealThumb: "https://www.themealdb.com/images/media/meals/1520084413.jpg",
			      idMeal: "52944"
			    }
    		]
		}

		this.props.filterCategory(data);
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
		return(
			<React.Fragment>
				<h2><ins>{ this.state.categoryID }</ins></h2><br />
				{
					this.state.meals.map(meal =>
						<section key={meal.idMeal}>
							<label htmlFor="meal">Meal: </label>
							<span name="meal">{ meal["strMeal"] }</span><br />

							<label htmlFor="thumbnail">Meal: </label>
							<span name="thumbnail">{ meal["strMealThumb"] }</span><br />

							<label htmlFor="id">Meal: </label>
							<span name="id">{ meal["idMeal"] }</span><br /><br />
						</section>
					)
				}
			</React.Fragment>
		);
	}
}

const mapStateToProps = state => {
	return {
		meals: state.mealsReducer
	}
}

export default connect(
	mapStateToProps,
	{ filterCategory }
)(Category)