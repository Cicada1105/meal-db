import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import { connect } from 'react-redux';
import { getIngredients } from '../../../app_state/action_creators/getActions.jsx';

import { NavButton, StyledButton, DescriptionCard, DescriptionLoadingCards } from '../../../static_components';
import styles from './index.module.css';

function Ingredients({ ingredients, getIngredients }) {
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();

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
			<header className={styles.ingredientsHeader}>
				<StyledButton onClickHandler={() => navigate(-1)}>Go Back</StyledButton>
				<h2>Ingredients</h2>
				<NavButton text="Home" path="/Home" />
			</header>
			<div className={styles.flexWrap}>
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