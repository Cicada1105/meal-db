import React from 'react';
import { useHistory } from 'react-router-dom';

import styles from './static_style.module.css';

function DescriptionCard(props) {
	let history = useHistory();

	const navigateTo = () => {
		history.push(props.imageLink);
	}

	return(
		<section className={styles.descrCard}>
			<h2>{props.header}</h2>
			<a href={props.imageLink}>
				<img src={props.imageURL} alt={props.header} onClick={() => navigateTo()} />
			</a>
			<div className={styles.cardBg}></div>
			<p>{props.descr}</p> 
		</section>
	)
}

export { DescriptionCard }