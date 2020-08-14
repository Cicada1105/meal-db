import React from 'react';

function DescriptionCard(props) {
	return(
		<div style={ props.style }>
			{props.descr}
		</div>
	)
}

export { DescriptionCard }