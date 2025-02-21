import React from 'react';
import { useNavigate } from 'react-router';

import styles from './static_style.module.css';

function DescriptionCard(props) {
	let navigate = useNavigate();

	return(
		<section className={styles.descrCard}>
			<h2>{props.header}</h2>
			<a href={props.imageLink}>
				<img src={props.imageURL} alt={props.header} onClick={() => navigate( props.imageLink )} />
			</a>
			<div className={styles.cardBg}></div>
			<p>{props.descr}</p> 
		</section>
	)
}

export { DescriptionCard }