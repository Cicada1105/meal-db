import React from 'react';

import { Button } from './button.jsx';
import styles from './static_style.module.css';

function ImageCard(props) {
	return (
		<section className={styles.imgCard}>
			<h3>{props.text}</h3>
			<img src={props.imageURL} alt={props.text} />
			<div className={styles.cardBg}></div>
			<Button text="View Recipe" location={props.location} />
		</section>	
	);
}

export { ImageCard }