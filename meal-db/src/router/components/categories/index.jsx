import React from 'react';

import { connect } from 'react-redux';
import { getCategories } from '../../../app_state/action_creators/getActions.jsx';

class Categories extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			categories: []
		}
	}
	componentDidMount() {
		const data = {
			meals: [	
			    {
			      strCategory: "Beef"
			    },
			    {
			      strCategory: "Breakfast"
			    },
			    {
			      strCategory: "Chicken"
			    },
			    {
			      strCategory: "Dessert"
			    }
			]
		}

		this.props.getCategories(data);
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
				{
					this.state.categories.map((category, i) => 
						<section key={i}>
							<label htmlFor="category">Category: </label>
							<span name="category">{ category["strCategory"] }</span><br /><br />
						</section>
					)
				}
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