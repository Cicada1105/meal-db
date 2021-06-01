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
			ingredientID: props.match.params.ingredientID
		}
	}
	componentDidMount() {
		fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${this.state.ingredientID}`)
			.then(response => response.json())
			.then(data => data["meals"] !== null ? this.props.filterIngredient(data) : this.props.filterIngredient({meals:[]}));

		this.setState(function() {
			return {
				isLoading: false
			}
		});
	}
	componentWillUnmount() {
		this.props.filterIngredient({meals: []});
	}
	render() {
		return(
			<React.Fragment>
				<header className={styles.ingredientHeader}>
					<Tag path={() => this.props.history.goBack()}>Go Back</Tag>
					<h2><ins>{this.state.ingredientID}</ins></h2>
					<Button text="Home" path="/Home" />
				</header>
				{
					this.state.isLoading ?
						<div className={styles.flexWrap}>
							<ImageCard text="Loading..." />
							<ImageCard text="Loading..." />
							<ImageCard text="Loading..." />
							<ImageCard text="Loading..." />
						</div> : (
							this.props.meals.length === 0 ?
							<h3>Unable to find "{this.state.ingredientID}" at this time</h3>
							:
							<div className={styles.flexWrap}>
							{
								this.props.meals.map(meal => 
									<ImageCard key={meal.idMeal} location={{
										from: `/Ingredients/${this.state.ingredientID}`,
										to: `/Meals/${meal.idMeal}`
									}} text={meal.strMeal} imageURL={meal.strMealThumb} />
								)
							}
							</div>
						)
				}
			</React.Fragment>
		)
	}
}

const mapStateToProps = state => {
	return {
		meals: [...state.filterMealsReducer]
	}
}

export default connect(
	mapStateToProps,
	{ filterIngredient }
)(Ingredient)