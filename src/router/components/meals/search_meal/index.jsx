	import React from 'react';

import { connect } from 'react-redux';
import { filterName } from '../../../../app_state/action_creators/filterActions.jsx';

import styles from './index.module.css';

import { PreviewCard } from './previewCard.jsx';
import { Tag } from '../../../../static_components';

class SearchMeal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			filteredMeals: []
		}
		this.inputRef = React.createRef();
	}
	handleClick = function(event) {
		let enteredVal = this.inputRef.current.value.toLowerCase();
		let firstLetter = enteredVal.slice(0,1);
		if (firstLetter) {
			fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${firstLetter}`)
				.then(response => response.json())
				.then(data =>  {
					let filteredMeals = data.meals.filter((meal) => meal["strMeal"].toLowerCase().includes(enteredVal));
					this.props.filterName({
						meals: filteredMeals
					});
				})
		}
	}
	componentWillUnmount() {
		// Clean up state
		this.props.filterName({})
	}
	render() {
		return(
			<React.Fragment>
				<header className={styles.searchMealHeader}>
					<Tag path={-1}>Go Back</Tag>	
					<h2><ins>Search Meal</ins></h2>
				</header>
				<input ref={this.inputRef} type="text" />
				<div className={styles.searchBtn} onClick={(e) => this.handleClick(e)}>Search</div>
				{
					this.props.meals !== undefined && 
					(
						this.props.meals.length !== 0 ?
						this.props.meals.map((meal, i) => <PreviewCard key={i} {...meal} /> ) :
						<h3>Unable to find "{this.inputRef.current.value}"</h3>
					)
				}
			</React.Fragment>
		);
	}
}

const mapStateToProps = state => {
	return {meals: state.filterMealsReducer[0]};
}
export default connect(
	mapStateToProps,
	{ filterName }
)(SearchMeal)