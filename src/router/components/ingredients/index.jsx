import React, { useEffect, useState } from 'react';

import { connect } from 'react-redux';
import { getIngredients } from '../../../app_state/action_creators/getActions.jsx';

import { PageHeader, DescriptionCard, DescriptionLoadingCards } from '../../../static_components';

function Ingredients({ ingredients, getIngredients }) {
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetch("https://www.themealdb.com/api/json/v1/1/list.php?i=list")
			.then(response => response.json())
			.then(data => getIngredients(data))
			.finally(() => setLoading(false));

		return () => {
			getIngredients({meals: []});
		}
	},[getIngredients]);
/*
	Was in previous class component. Appears to not be necessary
	componentDidUpdate(prevProps, prevState) {
		if (prevState["ingredients"].length === 0) {
			this.setState(function() {
				return {
					isLoading: false,
					ingredients: [...this.props["meals"]]
				}
			})
		}
	}
*/
	return (
		<React.Fragment>
			<PageHeader>Ingredients</PageHeader>
			<div className='card-grid'>
			{
				loading ?
					<DescriptionLoadingCards /> : 
					ingredients.map(meal => 
						meal["strDescription"] === null || meal["strDescription"] === "" ||
						<DescriptionCard key={meal.idIngredient} header={meal.strIngredient}
						 	imageURL={`https://www.themealdb.com/images/ingredients/${meal.strIngredient}-Small.png`}
						 	imageLink={`/Ingredients/${meal.strIngredient}`} descr={meal.strDescription} />
					)
			}
			</div>
		</React.Fragment>
	);
}

const mapStateToProps = state => {
	return {
		ingredients: state.getMealsReducer
	}
}

export default connect(
	mapStateToProps,
	{ getIngredients }
)(Ingredients);