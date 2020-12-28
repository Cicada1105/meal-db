import React from 'react';
import { useHistory } from 'react-router-dom';
import style from './static_style.module.css';

function Tag(props) {
	let history = useHistory();

	function navigate(pathIn) {
		history.push(pathIn);
	}

	return (
		<div className={ style.tag } onClick={() => typeof props.path === "string" ? navigate(props.path) : props.path()}>
			{ props.children }
		</div>
	);
}

export { Tag }