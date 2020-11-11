import React from 'react';

import { useHistory } from 'react-router-dom';

import styles from './index.module.css';

export const PreviewCard = ({ idMeal, strMeal, strTags, strCategory, strMealThumb }) => {
	const history = useHistory();

	const navigateTo = () => {
		history.push("/Meals/" + idMeal);
	}
	
	return (
		<section className={styles.searchCard}>
			<img src={`${strMealThumb}`} alt={strMeal} />
			<div className={styles.mealData}>
				<h4>{strMeal}</h4>
				<label htmlFor="tags">Tags: </label>
				{
					strTags === null ?
					<p name="tags">{strCategory}</p> :
					<p name="tags">{strTags}</p>
				}
			</div>
			<div className={styles.arrow} onClick={() => navigateTo()}></div>
			<div className={styles.bgCard}></div>
		</section>
	);
}