import React from 'react';
import { useNavigate } from 'react-router';
import style from './static_style.module.css';

function Tag(props) {
	let navigate = useNavigate();

	return (
		<div className={ style.tag } onClick={() => typeof props.path === "function" ? props.path() : navigate(props.path)}>
			{ props.children }
		</div>
	);
}

export { Tag }