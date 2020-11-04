import React from 'react';

import { connect } from 'react-redux';
import { filterIngredient } from '../../../../app_state/action_creators/filterActions.jsx';

import { ImageCard } from '../../../../static_components/imageCard.jsx';
import styles from './index.module.css';

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
				<h2><ins>{this.state.ingredientID}</ins></h2>
				<div className={styles.flexWrap}>
				{ 
					this.state.meals.map(meal => 
						<ImageCard key={meal.idMeal} text={meal.strMeal} imageURL={meal.strMealThumb} 
							recipeLink={`/Meals/${meal.idMeal}`} />
					)
				}
				</div>
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