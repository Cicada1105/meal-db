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
		fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${this.state.categoryID}`)
			.then(response => response.json())
			.then(data => this.props.filterCategory(data));
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