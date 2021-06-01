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
			categoryID: props.match.params.categoryID
		}
	}
	componentDidMount() {
		fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${this.state.categoryID}`)
			.then(response => response.json())
			.then(data => this.props.filterCategory(data));

		this.setState(function() {
			return {
				isLoading: false
			}
		});
	}
	componentWillUnmount() {
		this.props.filterCategory({meals: []});
	}
	render() {
		const emptyLoadingPath = {
			from:"",
			to:""
		}
		return(
			<React.Fragment>
				<header className={styles.categoryHeader}>
					<Tag path={() => this.props.history.goBack()}>Go Back</Tag>
					<h2><ins>{ this.state.categoryID }</ins></h2>
					<Button text="Home" path="/Home" />
				</header>
				<div className={styles.flexWrap}>
				{
					(this.state.isLoading || this.props.meals.length === 0) ?
						<>
							<ImageCard text="Loading..." location={emptyLoadingPath} />
							<ImageCard text="Loading..." location={emptyLoadingPath} />
							<ImageCard text="Loading..." location={emptyLoadingPath} />
							<ImageCard text="Loading..." location={emptyLoadingPath} />
						</> :
						this.props.meals.map((meal,i) =>
							<ImageCard key={i} location={{
								from:`/Categories/${this.state.categoryID}`,
								to:`/Meals/${meal["idMeal"]}`
							}} text={meal["strMeal"]} imageURL={meal["strMealThumb"]} />
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