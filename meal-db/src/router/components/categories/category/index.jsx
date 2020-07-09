import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

function Category() {
	const { categoryID } = useParams();
	useEffect(() => {
		console.log("Category component mounted...");
	});

	return(
		<div>{ categoryID }</div>
	);
}

export { Category }