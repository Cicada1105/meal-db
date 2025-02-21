import React from 'react';
import { Link } from 'react-router';
//import { Tag } from './tag.jsx';
import styles from './static_style.module.css';

function NavButton(props) {
	const location = props.location ? {
		pathname: props.location.to,
		state: {
			previousRoute: props.location.from
		}
	} : props.path;
	
	return(
		//<Tag path={ location }>
			//<Link to={ location } className={ styles.button } onClick={(e) => e.preventDefault()}>{ props.text }</Link>
			<Link to={ location } className={ styles.button }>{ props.text }</Link>
		//</Tag>
	);
}
function StyledButton(props) {
	return (
		<button className={ styles.button } onClick={ props.onClickHandler }>{ props.children }</button>
	)
}

export { NavButton, StyledButton }