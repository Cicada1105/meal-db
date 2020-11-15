import React from 'react';

import { connect } from 'react-redux';
import { filterName } from '../../../../app_state/action_creators/filterActions.jsx';

import styles from './index.module.css';

import { PreviewCard } from './previewCard.jsx';
import { Button, Tag } from '../../../../static_components';

class SearchMeal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			meals: [],
			filteredMeals: []
		}
		this.inputRef = React.createRef();
	}
	handleClick = function(event) {
		let keyCode = event.keyCode;
		// a == 65 && z == 90
		this.inputRef.current.removeEventListener("onKeyUp",(e) => this.handleClick(e));
		if ((keyCode >= 65) && (keyCode <= 90)) {
			let userData = event.target.value.toLowerCase();
			if (userData.length === 1) {
				fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${userData}`)
					.then(response => response.json())
					.then(data => this.props.filterName(data));
			}
			else {
				this.setState(() => ({
					filteredMeals: this.state.filteredMeals.filter(meal => meal.strMeal.toLowerCase().includes(userData))
				}));
			}	
		}
		else if (keyCode === 8) {
			let userData = event.target.value.toLowerCase();
			if ((userData.length === 0) && (this.state.filteredMeals.length > 0)) {
				this.setState(() => ({
					meals: [],
					filteredMeals: []
				}));
			}
			else if (userData.length > 0) {
				this.setState(() => ({
					filteredMeals: this.state.meals.filter(meal => meal.strMeal.toLowerCase().includes(userData))
				}));
			}
		}
		this.inputRef.current.addEventListener("onKeyUp",(e) => this.handleClick(e));
	}
	componentDidUpdate(prevProps,prevState) {
		if ((prevState.meals) && (prevState.meals.length === 0)) {
			this.setState(() => ({
				meals: this.props.meals,
				filteredMeals: this.props.meals
			}));
		}
	}
	render() {
		return(
			<React.Fragment>
				<header className={styles.searchMealHeader}>
					<Tag path={-1}>Go Back</Tag>		
					<h2><ins>Search Meal</ins></h2>
					<Button text="Home" path="/Home" />
				</header>
				<input ref={this.inputRef} type="text" onKeyUp={(e) => this.handleClick(e)} />
				{
					this.state.filteredMeals !== undefined && this.state.filteredMeals.length !== 0 &&
					this.state.filteredMeals.map((meal, i) => <PreviewCard key={i} {...meal} /> )
				}
			</React.Fragment>
		);
	}
}

const mapStateToProps = state => {
	return {meals: state.mealsReducer[0]};
}
export default connect(
	mapStateToProps,
	{ filterName }
)(SearchMeal)