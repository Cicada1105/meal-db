import React from 'react';
import { Link } from 'react-router-dom';
import { Tag } from './tag.jsx';
import styles from './static_style.module.css';

function Button(props) {
	const location = props.location ? {
		pathname: props.location.to,
		state: {
			previousRoute: props.location.from
		}
	} : props.path;
	
	return(
		<Tag path={ location }>
			<Link to={ location } className={ styles.button } onClick={(e) => e.preventDefault()}>{ props.text }</Link>
		</Tag>
	);
}

export { Button }