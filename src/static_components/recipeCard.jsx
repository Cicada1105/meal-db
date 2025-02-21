import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';

import { StyledButton } from './button.jsx';

import styles from './static_style.module.css';

const RecipeCard = (props) => {
	const navigate = useNavigate();
	
	const headerRef = useRef(null);
	const mainRef = useRef(null);
	const ingredientsRef = useRef(null);
	const scrollBlurRef = useRef(null);
	const instructionsRef = useRef(null);
	const footerRef = useRef(null);
	const bgCardRef = useRef(null);

	useEffect(() => {
		const headerHeight = headerRef.current.offsetHeight;
		const instructionsHeight = instructionsRef.current.offsetHeight;
		const footerHeight = footerRef.current.offsetHeight;

		const screenBottomMargin = parseInt(window.getComputedStyle(mainRef.current).marginBottom);

		// Min height = 100vh - height of area above recipe card
		const minHeight = window.innerHeight - (headerHeight + screenBottomMargin);
		// content = instructions height + footer height + footer bottom offset (36px)
		const contentHeight = instructionsHeight + footerHeight + screenBottomMargin;

		// Set background card to height of max val between minHeight and contentHeight
		bgCardRef.current.style.height = `${Math.max(minHeight,contentHeight)}px`;
		mainRef.current.style.height = `${Math.max(minHeight,contentHeight)}px`;
		// If ingredients overflows, display scroll blur, else don't
		scrollBlurRef.current.style.display = ingredientsRef.current.scrollHeight > ingredientsRef.current.offsetHeight ? "block" : "none";
	},[headerRef,instructionsRef,footerRef]);

	return(
		<section className={styles.recipeSection}>
			<header className={styles.recipeHeader} ref={headerRef}>
				<StyledButton onClickHandler={ () => navigate(-1) }>Go Back</StyledButton>
				<h2><ins>{ props.strMeal }</ins></h2>
				<span className={styles.category}>
					Category: <button className={styles.link} onClick={() => navigate(`/Categories/${props.strCategory}`)}>{ props.strCategory }</button>
				</span>
				<span className={styles.area}>
					Area: <button className={styles.link} onClick={() => navigate(`/Areas/${props.strArea}`)}>{ props.strArea }</button>
				</span>
				<StyledButton onClickHandler={() => typeof props.btnPath === "string" ? navigate(props.btnPath) : props.btnPath()}>{ props.btnText }</StyledButton>
			</header>
			<main ref={mainRef} className={styles.recipeCard}>
				<figure onClick={() => window.open(`${props.strSource}`,"_blank")}>
					<img src={props.strMealThumb} alt={props.strMeal} />
					<figcaption>- View Source -</figcaption>
				</figure>

				<article>
					<h3>Ingredients</h3>
					<div ref={ingredientsRef} className={styles.ingredients}>
					{
						props.strIngredients.map((ingredient, i) => <p key={i}>{ ingredient }</p> )
					}
					</div>
					<div ref={scrollBlurRef} className={styles.scrollBlur}></div>
				</article>
				<div ref={instructionsRef} className={styles.instructions}>
				{
					props.strInstructions.includes("\r\n\r\n") ?
					props.strInstructions.split("\r\n\r\n").map((instruction, i) => <p key={i}>{ instruction }</p> ) :
					props.strInstructions.split("\r\n").map((instruction, i) => <p key={i}>{ instruction }</p> )
				}
				</div>
				<footer ref={footerRef}>
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
			</main>
			<div ref={bgCardRef} className={styles.recipeCardBg}></div>
		</section>
	);
}

export { RecipeCard }