import React from 'react';

import { connect } from 'react-redux';
import { getAreas } from '../../../app_state/action_creators/getActions.jsx';

import { Button, Tag } from '../../../static_components';
import styles from './index.module.css';

class Areas extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			isLoading: true,
			areas: []
		}
	}
	componentDidMount() {
		fetch("https://www.themealdb.com/api/json/v1/1/list.php?a=list")
			.then(response => response.json())
			.then(data => {
				this.props.getAreas(data);
			});
	}
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
	render() {
		return(
			<React.Fragment>
				<header className={styles.areasHeader}>
					<Tag path={-1}>Go Back</Tag>
					<h2><ins>Areas</ins></h2>
					<Button text="Home" path="/Home" />
				</header>
				<div className={styles.bg}></div>
				<div className={styles.areasSection}>
				{
					this.state.isLoading ?
						<h3>Loading...</h3> :
						this.state.areas.map((area, i) =>
							<Button key={i} text={area["strArea"]} path={`/Areas/${area['strArea']}`} />
						)
				}
				</div>
			</React.Fragment>
		);
	}
}

const mapStateToProps = state => {
	return {
		isLoading: state["loadingReducer"].isLoading,
		meals: state.mealsReducer
	}
}

export default connect(
	mapStateToProps,
	{ getAreas }
)(Areas)