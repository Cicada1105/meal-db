import React, { useEffect, useState } from 'react';

import { connect } from 'react-redux';
import { filterCategory } from '../../../../app_state/action_creators/filterActions.jsx';

import { NavButton, StyledButton, ImageCard } from '../../../../static_components';
import styles from './index.module.css';

function Category({ filterCategory, history, meals, match: { params } }) {
	// Extract out necessary values from parameters
	const { categoryID } = params;
	// Local state
	const [loading, setLoading] = useState(true);

	const emptyLoadingPath = {
		from:"",
		to:""
	}

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
				<StyledButton onClickHandler={() => history.goBack()}>Go Back</StyledButton>
				<h2><ins>{ categoryID }</ins></h2>
				<NavButton text="Home" path="/Home" />
			</header>
			<div className={styles.flexWrap}>
			{
				(loading || meals.length === 0) ?
					<>
						<ImageCard text="Loading..." location={emptyLoadingPath} />
						<ImageCard text="Loading..." location={emptyLoadingPath} />
						<ImageCard text="Loading..." location={emptyLoadingPath} />
						<ImageCard text="Loading..." location={emptyLoadingPath} />
					</> :
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