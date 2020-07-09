import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

function Ingredient() {
	const { ingredientID } = useParams();

	useEffect(() => {
		console.log("Ingredient component ");
	});

	return(
		<div>{ ingredientID }</div>
	)
}

export { Ingredient }