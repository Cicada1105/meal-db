import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

function Meal() {
	const { mealID } = useParams();

	useEffect(() => {
		console.log("Meal component mounted...");
	});

	return(
		<div>{ mealID }</div>
	)
}

export { Meal }