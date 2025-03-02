import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import { connect } from 'react-redux';
import { getCategories } from '../../../app_state/action_creators/getActions.jsx';

import { NavButton, StyledButton, DescriptionCard, DescriptionLoadingCards } from '../../../static_components';
import styles from './index.module.css';

function Categories({ categories, getCategories }){
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();

	useEffect(() => {
		fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
			.then(response => response.json())
			.then(data => getCategories(data))
			.finally(() => setLoading(false));

		return () => {
			getCategories({categories: []});
		}
	},[getCategories]);
/*
	Was in previous class component. Appears to not be necessary
	componentDidUpdate(prevProps, prevState) {
		if (prevState["categories"].length === 0) {
			this.setState(function() {
				return {
					isLoading: false,
					categories: [...this.props["categories"]]
				}
			})
		}
	}
*/
	return (
		<React.Fragment>
			<header className={styles.categoriesHeader}>
				<StyledButton onClickHandler={() => navigate(-1)}>Go Back</StyledButton>
				<h2>Categories</h2>
				<NavButton text="Home" path="/Home" />
			</header>
			<div className={styles.flexWrap}>
			{
				loading ?
					<DescriptionLoadingCards /> :
					categories.map(category => 
						<DescriptionCard key={category["idCategory"]} header={category["strCategory"]} 
							imageURL={category["strCategoryThumb"]} imageLink={`/Categories/${category['strCategory']}`}
							descr={category["strCategoryDescription"]}/>
					)
			}
			</div>
		</React.Fragment>
	);
}

const mapStateToProps = state => {
	return {
		categories: state.getMealsReducer
	}
}

export default connect(
	mapStateToProps,
	{ getCategories }
)(Categories)