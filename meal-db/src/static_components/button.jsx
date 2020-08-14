import React from 'react';
import { Link } from 'react-router-dom';
import { Tag } from './tag.jsx';
import styles from './static_style.module.css';

function Button(props) {
	return(
		<Tag path={ props.path }>
			<Link to={props.path} className={ styles.button } onClick={(e) => e.preventDefault()}>{ props.text }</Link>
		</Tag>
	);
}

export { Button }