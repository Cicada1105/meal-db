import React from 'react';

import { connect } from 'react-redux';
import { filterIngredient } from '../../../../app_state/action_creators/filterActions.jsx';

import { Button, ImageCard, Tag } from '../../../../static_components';
import styles from './index.module.css';

class Ingredient extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: true,
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
					isLoading: false,
					meals: [...this.props.meals]
				}
			})
		}
	}
	render() {
		return(
			<React.Fragment>
				<header className={styles.ingredientHeader}>
					<Tag path={-1}>Go Back</Tag>
					<h2><ins>{this.state.ingredientID}</ins></h2>
					<Button text="Home" path="/Home" />
				</header>
				<div className={styles.flexWrap}>
				{
					this.state.isLoading ?
						<>
							<ImageCard text="Loading..." />
							<ImageCard text="Loading..." />
							<ImageCard text="Loading..." />
							<ImageCard text="Loading..." />
						</> :
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