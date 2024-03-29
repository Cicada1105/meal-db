import React from 'react';
// Components
import { NavButton } from '../../../static_components';
// Styling
import styles from './style.module.css';
// Images
import cardBg1 from '../../../resources/imgs/brush_stroke_1.png';
import cardBg2 from '../../../resources/imgs/brush_stroke_2.png';

function Row(props) {
	const descriptionStyle = {
		position:"absolute",
		top:"1.2rem",
		width:"14rem"
	}
	return(
		<div className={ styles.row }>
			<div className={ styles.btnCont }>
				<NavButton path={props.btn.path} text={props.btn.text} />
			</div>
			<div className={ styles.cardCont }>
				<img src={ props.imgNum === 1 ? cardBg1 : cardBg2 } className={ props.imgNum === 1 ? styles.cardBg1 : styles.cardBg2 } alt="*Description Card*" />
				<div style={descriptionStyle}>{props.descr}</div>
			</div>
		</div>
	)
}

export { Row }