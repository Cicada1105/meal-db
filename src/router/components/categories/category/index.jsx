import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';

import { connect } from 'react-redux';
import { filterCategory } from '../../../../app_state/action_creators/filterActions.jsx';

import { NavButton, StyledButton, ImageCard, ImageLoadingCards } from '../../../../static_components';
import styles from './index.module.css';

function Category({ filterCategory, meals }) {
	// Local state
	const [loading, setLoading] = useState(true);

	// Extract out necessary values from parameters
	const { categoryID } = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryID}`)
			.then(response => response.json())
			.then(data => filterCategory(data))
			.finally(() => setLoading(false));

		return () => {
			filterCategory({meals: []});
		}
	},[categoryID, filterCategory]);

	return(
		<React.Fragment>
			<header className={styles.categoryHeader}>
				<StyledButton onClickHandler={() => navigate(-1)}>Go Back</StyledButton>
				<h2><ins>{ categoryID }</ins></h2>
				<NavButton text="Home" path="/Home" />
			</header>
			<div className={styles.flexWrap}>
			{
				(loading || meals.length === 0) ?
					<ImageLoadingCards /> :
					meals.map((meal,i) =>
						<ImageCard key={i} location={{
							from:`/Categories/${categoryID}`,
							to:`/Meals/${meal["idMeal"]}`
						}} text={meal["strMeal"]} imageURL={meal["strMealThumb"]} />
					)
			}
			</div>
		</React.Fragment>
	)
}

const mapStateToProps = state => {
	return {
		meals: state.filterMealsReducer
	}
}

export default connect(
	mapStateToProps,
	{ filterCategory }
)(Category)