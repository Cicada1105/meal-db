import React from 'react';

import { connect } from 'react-redux';
import { getIngredients } from '../../../app_state/action_creators/getActions.jsx';

import { Button, DescriptionCard, Tag } from '../../../static_components';
import styles from './index.module.css';

class Ingredients extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: true,
			ingredients: []
		}
	}
	componentDidMount() {
		fetch("https://www.themealdb.com/api/json/v1/1/list.php?i=list")
			.then(response => response.json())
			.then(data => this.props.getIngredients(data));
	}
	componentDidUpdate(prevProps, prevState) {
		if (prevState["ingredients"].length === 0) {
			this.setState(function() {
				return {
					isLoading: false,
					ingredients: [...this.props["meals"]]
				}
			})
		}
	}
	componentWillUnmount() {
		this.props.getIngredients({meals: []})
	}
	
	render() {
		return (
			<React.Fragment>
				<header className={styles.ingredientsHeader}>
					<Tag path={() => this.props.history.goBack()}>Go Back</Tag>
					<h2><ins>Ingredients</ins></h2>
					<Button text="Home" path="/Home" />
				</header>
				<div className={styles.flexWrap}>
				{
					this.state.isLoading ?
						<>
							<DescriptionCard header="Loading..." />
							<DescriptionCard header="Loading..." />
							<DescriptionCard header="Loading..." />
							<DescriptionCard header="Loading..." />
						</> : 
						this.state.ingredients.map(meal => 
							meal["strDescription"] === null || meal["strDescription"] === "" ||
							<DescriptionCard key={meal.idIngredient} header={meal.strIngredient}
							 	imageURL={`https://www.themealdb.com/images/ingredients/${meal.strIngredient}-Small.png`}
							 	imageLink={`Ingredients/${meal.strIngredient}`} descr={meal.strDescription} />
						)
				}
				</div>
			</React.Fragment>
		);
	}
}

const mapStateToProps = state => {
	return {
		meals: state.getMealsReducer
	}
}

export default connect(
	mapStateToProps,
	{ getIngredients }
)(Ingredients);