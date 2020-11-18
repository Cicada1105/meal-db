import React from 'react';

import { connect } from 'react-redux';
import { filterCategory } from '../../../../app_state/action_creators/filterActions.jsx';

import { Button, ImageCard, Tag } from '../../../../static_components';
import styles from './index.module.css';

class Category extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: true,
			categoryID: props.match.params.categoryID,
			meals: []
		}
	}
	componentDidMount() {
		fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${this.state.categoryID}`)
			.then(response => response.json())
			.then(data => this.props.filterCategory(data));
	}
	componentDidUpdate(prevProps,prevState) {
		if (prevState["meals"].length === 0) {
			this.setState(function() {
				return {
					isLoading: false,
					meals: [...this.props.meals]
				}
			})
		}
	}
	render() {
		return(
			<React.Fragment>
				<header className={styles.categoryHeader}>
					<Tag path={-1}>Go Back</Tag>
					<h2><ins>{ this.state.categoryID }</ins></h2>
					<Button text="Home" path="/Home" />
				</header>
				<div className={styles.flexWrap}>
				{
					this.state.isLoading ?
						<>
							<ImageCard text="Loading..." />
							<ImageCard text="Loading..." />
							<ImageCard text="Loading..." />
							<ImageCard text="Loading..." />
						</> :
						this.state.meals.map((meal,i) =>
							<ImageCard key={i} text={meal["strMeal"]} imageURL={meal["strMealThumb"]} recipeLink={`/Meals/${meal["idMeal"]}`} />
						)
				}
				</div>
			</React.Fragment>
		);
	}
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