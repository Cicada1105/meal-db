import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';

import { PageHeader } from './';

import styles from './static_style.module.css';

const RecipeCard = (props) => {
	const navigate = useNavigate();
	
	const ingredientsRef = useRef(null);
	const scrollBlurRef = useRef(null);

	useEffect(() => {
		// If ingredients overflows, display scroll blur, else don't
		scrollBlurRef.current.style.display = ingredientsRef.current.scrollHeight > ingredientsRef.current.offsetHeight ? "block" : "none";
	},[]);

	return(
		<section className={styles.recipeSection}>
			<PageHeader>{ props.strMeal }</PageHeader>
			<nav className={styles.recipeNav}>
				<span className={styles.category}>
					Category: <button className={styles.link} onClick={() => navigate(`/Categories/${props.strCategory}`)}>{ props.strCategory }</button>
				</span>
				<span className={styles.area}>
					Area: <button className={styles.link} onClick={() => navigate(`/Areas/${props.strArea}`)}>{ props.strArea }</button>
				</span>
			</nav>
			<main className={styles.recipeCard}>
				<figure onClick={() => window.open(`${props.strSource}`,"_blank")}>
					<img src={props.strMealThumb} alt={props.strMeal} />
					<figcaption>- View Source -</figcaption>
				</figure>

				<article>
					<h3>Ingredients</h3>
					<div ref={ingredientsRef} className={styles.ingredients.concat(' hide-scrollbar')}>
					{
						props.strIngredients.map((ingredient, i) => <p key={i}>{ ingredient }</p> )
					}
					</div>
					<div ref={scrollBlurRef} className={styles.scrollBlur}></div>
				</article>
				<div className={styles.instructions}>
				{
					props.strInstructions.includes("\r\n\r\n") ?
					props.strInstructions.split("\r\n\r\n").map((instruction, i) => <p key={i}>{ instruction }</p> ) :
					props.strInstructions.split("\r\n").map((instruction, i) => <p key={i}>{ instruction }</p> )
				}
				</div>
				<footer>
					{
						props.strTags &&
						<>
							<p>Tags:</p>
							{
								props.strTags.split(",").map((tag, i) => 
									<p key={i}>
										{ tag }
									</p>
								)
							}
						</>
					}
				</footer>
				<div className={styles.recipeCardBg}></div>
			</main>
		</section>
	);
}

export { RecipeCard }