import React, { useEffect, useState } from 'react';

import { connect } from 'react-redux';
import { getAreas } from '../../../app_state/action_creators/getActions.jsx';

import { NavButton, StyledButton } from '../../../static_components';
import styles from './index.module.css';

function Areas({ areas, getAreas, history }) {
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetch("https://www.themealdb.com/api/json/v1/1/list.php?a=list")
			.then(response => response.json())
			.then(data => getAreas(data))
			.finally(() => setLoading(false));

		return () => {
			getAreas({meals: []});
		}
	},[getAreas]);
/*
	Was in previous class component. Appears to not be necessary
	componentDidUpdate(prevProps,prevState) {
		if (prevState["areas"].length === 0) {
			this.setState(function() {
				return {
					isLoading: false,
					areas: [...this.props.meals]
				}
			})
		}
	}
*/
	return (
		<React.Fragment>
			<header className={styles.areasHeader}>
				<StyledButton onClickHandler={() => history.goBack()}>Go Back</StyledButton>
				<h2><ins>Areas</ins></h2>
				<NavButton text="Home" path="/Home" />
			</header>
			<div className={styles.bg}></div>
			<div className={styles.areasSection}>
			{
				loading ?
					<h3>Loading...</h3> :
					areas.map((area, i) =>
						<NavButton key={i} text={area["strArea"]} path={`/Areas/${area['strArea']}`} />
					)
			}
			</div>
		</React.Fragment>
	);
}

const mapStateToProps = state => {
	return {
		areas: state.getMealsReducer
	}
}

export default connect(
	mapStateToProps,
	{ getAreas }
)(Areas)