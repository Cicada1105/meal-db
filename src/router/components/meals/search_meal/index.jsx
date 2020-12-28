import React, { useEffect, useState, useRef } from 'react';

import { connect } from 'react-redux';
import { filterName } from '../../../../app_state/action_creators/filterActions.jsx';

import styles from './index.module.css';

import { PreviewCard } from './previewCard.jsx';
import { Tag } from '../../../../static_components';

const SearchMeal = ({ history, filterName, meals }) => {
	// Initialize state
	const [filteredMeals, setFilteredMeals] = useState(undefined);
	const [isLoading, setLoading] = useState(false);
	// Initialie references
	const inputRef = useRef("");

	useEffect(() => {
		if (meals !== undefined)
			setFilteredMeals([...meals])

		return () => {
			filterName({meals: undefined})
		}
	},[meals,filterName]);

	const handleClick = function() {
		// Update loading state
		setLoading(true);
		// Get user input
		let enteredVal = inputRef.current.value.toLowerCase();
		// Extract first letter for searching mealdb
		let firstLetter = enteredVal.slice(0,1);
		if (firstLetter) {
			fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${firstLetter}`)
				.then(response => response.json())
				.then(data =>  {
					let filteredMeals = data.meals.filter((meal) => meal["strMeal"].toLowerCase().includes(enteredVal));
					filterName({
						meals: filteredMeals
					});
					// Done loading request
					setLoading(false);
				})
		}
	}
	return (
		<React.Fragment>
			<header className={styles.searchMealHeader}>
				<Tag path={() => history.goBack()}>Go Back</Tag>	
				<h2><ins>Search Meal</ins></h2>
			</header>
			<input ref={inputRef} type="text" />
			<div className={styles.searchBtn} onClick={() => handleClick()}>Search</div>
			{
				//filteredMeals !== undefined && 
				filteredMeals !== undefined &&
				(
					isLoading ?
					<h3>Loading...</h3> :
					(
						filteredMeals.length !== 0 ?
						filteredMeals.map((meal,i) => <PreviewCard key={i} {...meal} />) :
						<h3>Unable to find "{inputRef.current.value}"</h3>
					)
				)
			}
		</React.Fragment>
	)
}

const mapStateToProps = state => {
	return {meals: state.filterMealsReducer[0]};
}
export default connect(
	mapStateToProps,
	{ filterName }
)(SearchMeal)