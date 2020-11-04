import React, { useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';

import { Tag } from './tag.jsx';

import styles from './static_style.module.css';

const RecipeCard = (props) => {
	const history = useHistory();

	const headerRef = useRef(null);
	const asideRef = useRef(null);
	const mainRef = useRef(null);
	const ingredientsRef = useRef(null);
	const scrollBlurRef = useRef(null);
	const instructionsRef = useRef(null);
	const footerRef = useRef(null);
	const bgCardRef = useRef(null);

	function navigateTo(pathIn) {
		history.push(pathIn);
	}

	useEffect(() => {
		const headerHeight = headerRef.current.offsetHeight;
		const asideHeight = asideRef.current.offsetHeight;
		const instructionsHeight = instructionsRef.current.offsetHeight;
		const footerHeight = footerRef.current.offsetHeight;

		const asideBottomMargin = parseInt(window.getComputedStyle(asideRef.current).marginBottom);
		const screenBottomMargin = parseInt(window.getComputedStyle(bgCardRef.current).marginBottom);

		// Min height = 100vh - height of area above recipe card
		const minHeight = window.innerHeight - (headerHeight + asideHeight + asideBottomMargin + screenBottomMargin);
		// content = instructions height + footer height + footer bottom offset (30px)
		const contentHeight = instructionsHeight + footerHeight + 30;

		// Set background card to height of max val between minHeight and contentHeight
		bgCardRef.current.style.height = `${Math.max(minHeight,contentHeight)}px`;
		mainRef.current.style.height = `${Math.max(minHeight,contentHeight)}px`;
		// If ingredients overflows, display scroll blur, else don't
		scrollBlurRef.current.style.display = ingredientsRef.current.scrollHeight > ingredientsRef.current.offsetHeight ? "block" : "none";
	},[headerRef,asideRef,instructionsRef,footerRef]);

	return(
		<section className={styles.recipeSection}>
			<header ref={headerRef}>{ props.meal }</header>
			<aside ref={asideRef}>
				<span className={styles.category}>
					Category: <span className={styles.link} onClick={() => navigateTo(`/Categories/${props.category}`)}>{ props.category }</span>
				</span>
				<span className={styles.area}>
					Area: <span className={styles.link} onClick={() => navigateTo(`/Areas/${props.area}`)}>{ props.area }</span>
				</span>
			</aside>
			<main ref={mainRef} className={styles.recipeCard}>
				<figure onClick={() => window.open(`${props.source}`,"_blank")}>
					<img src={props.img} alt={props.meal} />
					<figcaption>- View Source -</figcaption>
				</figure>

				<article>
					<h3>Ingredients</h3>
					<div ref={ingredientsRef} className={styles.ingredients}>
					{
						props.ingredients.map((ingredient, i) => <p key={i}>{ ingredient }</p> )
					}
					</div>
					<div ref={scrollBlurRef} className={styles.scrollBlur}></div>
				</article>
				<div ref={instructionsRef} className={styles.instructions}>
				{
					props.instructions.includes("\r\n\r\n") ?
					props.instructions.split("\r\n\r\n").map((instruction, i) => <p key={i}>{ instruction }</p> ) :
					props.instructions.split("\r\n").map((instruction, i) => <p key={i}>{ instruction }</p> )
				}
				</div>
				<footer ref={footerRef}>
					Tags:
					{
						props.tags &&
						props.tags.split(",").map((tag, i) => 
							<Tag key={i}>
								{ tag }
							</Tag>
						)
					}
				</footer>
			</main>
			<div ref={bgCardRef} className={styles.recipeCardBg}></div>
		</section>
	);
}

export { RecipeCard }