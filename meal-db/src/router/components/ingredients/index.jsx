import React from 'react';

import { connect } from 'react-redux';
import { getIngredients } from '../../../app_state/action_creators/getActions.jsx';

import { DescriptionCard } from '../../../static_components/descriptionCard.jsx';
import styles from './index.module.css';

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
				<h2><ins>Ingredients</ins></h2>
				<div className={styles.flexWrap}>
				{
					this.state.ingredients.map(meal => 
						<DescriptionCard key={meal.idIngredient} header={meal.strIngredient}
						 imageURL={`https://www.themealdb.com/images/ingredients/${meal.strIngredient}-Small.png`}
						 imageLink={`Ingredients/${meal.strIngredient}`} descr={meal.strDescription} />
					)
				}
				</div>
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