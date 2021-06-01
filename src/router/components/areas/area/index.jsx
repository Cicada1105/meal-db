import React from 'react';

import { connect } from 'react-redux'
import { filterArea } from '../../../../app_state/action_creators/filterActions.jsx';

import { Button, ImageCard, Tag } from '../../../../static_components';
import styles from './index.module.css';

class Area extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: true,
			areaID: props.match.params.areaID
		}
	}
	componentDidMount() {
		fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${this.state.areaID}`)
			.then(response => response.json())
			.then(data => this.props.filterArea(data));

		this.setState(function() {
			return {
				isLoading: false
			}
		})
	}
	componentWillUnmount() {
		this.props.filterArea({meals: []})
	}
	render() {
		const emptyLoadingPath = {
			from:"",
			to:""
		}
		return (
			<React.Fragment>
				<header className={styles.areaHeader}>
					<Tag path={() => this.props.history.goBack()}>Go Back</Tag>
					<h2><ins>{ this.state.areaID }</ins></h2>
					<Button text="Home" path="/Home" />
				</header>
				<div className={styles.flexWrap}>
				{
					this.state.isLoading ?
						<>
							<ImageCard text="Loading..." location={emptyLoadingPath} />
							<ImageCard text="Loading..." location={emptyLoadingPath} />
							<ImageCard text="Loading..." location={emptyLoadingPath} />
							<ImageCard text="Loading..." location={emptyLoadingPath} />
						</> :
						this.props.meals.map(meal =>
							<ImageCard key={meal.idMeal} location={{
								from: `/Areas/${this.state.areaID}`,
								to: `/Meals/${meal.idMeal}`
							}} text={meal.strMeal} imageURL={meal.strMealThumb} />
						)
				}
				</div>
			</React.Fragment>
		)
	}
}
const mapStateToProps = state => {
	return {
		meals: state.filterMealsReducer
	}
}

export default connect(
	mapStateToProps,
	{ filterArea }
)(Area);