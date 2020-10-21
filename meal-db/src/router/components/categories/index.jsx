import React from 'react';

import { connect } from 'react-redux';
import { getCategories } from '../../../app_state/action_creators/getActions.jsx';

import { DescriptionCard } from '../../../static_components/descriptionCard.jsx';
import styles from './index.module.css';

class Categories extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			categories: []
		}
	}
	componentDidMount() {
		fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
			.then(response => response.json())
			.then(data => this.props.getCategories(data));
	}
	componentDidUpdate(prevProps,prevState) {
		if (prevState["categories"].length === 0) {
			this.setState(function() {
				return {
					categories: [...this.props["categories"]]
				}
			})
		}
	}
	render() {
		return (
			<React.Fragment>
				<h2><ins>Categories</ins></h2><br />
				<div class={styles.flexWrap}>
				{
					this.state.categories.map(category => 
						<DescriptionCard key={category["idCategory"]} header={category["strCategory"]} 
							imageURL={category["strCategoryThumb"]} imageAlt={category["strCategory"]} 
							imageLink={`/Categories/${category['strCategory']}`} descr={category["strCategoryDescription"]}/>
					)
				}
				</div>
			</React.Fragment>
		);
	}
}

const mapStateToProps = state => {
	return {
		categories: state.mealsReducer
	}
}
export default connect(
	mapStateToProps,
	{ getCategories }
)(Categories)