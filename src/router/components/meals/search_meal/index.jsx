//import React, { useEffect, useState, useRef } from 'react';
import React from 'react';

import { connect } from 'react-redux';
import { filterName } from '../../../../app_state/action_creators/filterActions.jsx';

import styles from './index.module.css';

import { PreviewCard } from './previewCard.jsx';
import { StyledButton } from '../../../../static_components';


class SearchMeal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isDoneSearching: undefined
		}
		this.inputRef = React.createRef("");
	}
	componentWillUnmount() {
		this.props.filterName({
			meals: []
		});
	}
	handleClick = () => {
		// Update loading state
		this.setState(function() {
			return {
				isDoneSearching: false
			}
		});
		
		// Get user input
		let enteredVal = this.inputRef.current.value.toLowerCase();
		// Extract first letter for searching mealdb
		let firstLetter = enteredVal.slice(0,1);
		if (firstLetter) {
			fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${firstLetter}`)
				.then(response => response.json())
				.then(data =>  {
					let filteredMeals = data.meals.filter((meal) => meal["strMeal"].toLowerCase().includes(enteredVal));
					this.setState(() => ({
						isDoneSearching: true
					}));
					this.props.filterName({
						meals: filteredMeals
					})
				})
		}
	}

	render() {
		return (
			<React.Fragment>
				<header className={styles.searchMealHeader}>
					<StyledButton onClickHandler={() => this.props.history.goBack()}>Go Back</StyledButton>
					<h2><ins>Search Meal</ins></h2>
				</header>
				<input ref={this.inputRef} type="text" />
				{/*<div className={styles.searchBtn} onClick={this.handleClick}>Search</div>*/}
				<StyledButton onClickHandler={this.handleClick}>Search</StyledButton>
				{
					this.state.isDoneSearching === undefined ||
					(
						!this.state.isDoneSearching ?
						<h3>Loading...</h3> :
						(
							this.props.meals.length !== 0 ?
							this.props.meals.map((meal,i) => <PreviewCard key={i} {...meal} />) :
							<h3>Unable to find "{this.inputRef.current.value}"</h3>
						)
					)
				}
			</React.Fragment>
		)
	}
}

const mapStateToProps = state => {
	return {meals: state.filterMealsReducer};
}
export default connect(
	mapStateToProps,
	{ filterName }
)(SearchMeal)