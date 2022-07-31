import React from 'react';

import { NavButton } from '../../../../static_components/';

import styles from './index.module.css';

export const PreviewCard = ({ idMeal, strMeal, strTags, strCategory, strMealThumb }) => {
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
			<NavButton path={"/Meals/" + idMeal} text="View Recipe"></NavButton>
			<div className={styles.bgCard}></div>
		</section>
	);
}