import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

function Area() {
	const { areaID } = useParams();
	useEffect(() => {
		console.log("Area component mounted...");
	});

	return(
		<div>{ areaID }</div>
	);
}

export { Area }