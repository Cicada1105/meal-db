import React from 'react';

import { connect } from 'react-redux';
import { filterCategory } from '../../../../app_state/action_creators/filterActions.jsx';

import { ImageCard } from '../../../../static_components/imageCard.jsx';
import styles from './index.module.css';

class Category extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
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
					meals: [...this.props.meals]
				}
			})
		}
	}
	render() {
		return(
			<React.Fragment>
				<h2><ins>{ this.state.categoryID }</ins></h2><br />
				<div className={styles.flexWrap}>
				{
					this.state.meals.map(meal =>
						<ImageCard text={meal["strMeal"]} imageURL={meal["strMealThumb"]} recipeLink={`/Meals/${meal["idMeal"]}`} />
					)
				}
				</div>
			</React.Fragment>
		);
	}
}

const mapStateToProps = state => {
	return {
		meals: state.mealsReducer
	}
}

export default connect(
	mapStateToProps,
	{ filterCategory }
)(Category)