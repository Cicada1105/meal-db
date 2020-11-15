import React from 'react';
import { useHistory } from 'react-router-dom';
import style from './static_style.module.css';

function Tag(props) {
	let history = useHistory();

	function navigate(pathIn) {
		history.push(pathIn);
	}
	function goBack() {
		history.goBack();
	}

	return (
		<div className={ style.tag } onClick={() => props.path && (props.path === -1 ? goBack() : navigate(props.path))}>
			{ props.children }
		</div>
	);
}

export { Tag }