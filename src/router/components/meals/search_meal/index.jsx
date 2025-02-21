import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router';

import { connect } from 'react-redux';
import { filterName } from '../../../../app_state/action_creators/filterActions.jsx';

import styles from './index.module.css';

import { PreviewCard } from './previewCard.jsx';
import { StyledButton } from '../../../../static_components';

function SearchMeal({ meals, filterName }) {
	const [doneSearching, setDoneSearching] = useState(undefined);
	const inputRef = useRef(null);
	const navigate = useNavigate();

	useEffect(() => {
		return () => {
			filterName({meals: []});
		}
	},[filterName]);

	const handleClick = () => {
		// Update loading state
		setDoneSearching(false);
		
		// Get user input
		let enteredVal = inputRef.current.value.toLowerCase();
		// Extract first letter for searching mealdb
		let firstLetter = enteredVal.slice(0,1);
		if (firstLetter) {
			fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${firstLetter}`)
				.then(response => response.json())
				.then(data => 
					data.meals.filter((meal) => meal["strMeal"].toLowerCase().includes(enteredVal))
				)
				.then(filteredMeals => filterName({ meals: filteredMeals }))
				.finally(() => setDoneSearching(true));
		}
	}
	return (
		<React.Fragment>
			<header className={styles.searchMealHeader}>
				<StyledButton onClickHandler={() => navigate(-1)}>Go Back</StyledButton>
				<h2><ins>Search Meal</ins></h2>
			</header>
			<input ref={inputRef} type="text" />
			<search>
				<StyledButton onClickHandler={handleClick}>Search</StyledButton>
			</search>
			{
				doneSearching === undefined ||
				(
					!doneSearching ?
					<h3>Loading...</h3> :
					(
						meals.length !== 0 ?
						meals.map((meal,i) => <PreviewCard key={i} {...meal} />) :
						<h3>Unable to find "{inputRef.current.value}"</h3>
					)
				)
			}
		</React.Fragment>
	);
}

const mapStateToProps = state => {
	return {meals: state.filterMealsReducer};
}
export default connect(
	mapStateToProps,
	{ filterName }
)(SearchMeal)