import React, { useEffect } from 'react';

function Ingredients() {
	useEffect(() => {
		console.log("Ingredients component mounted...");
	});
	return (
		<div>Ingredients</div>
	)
}

export { Ingredients }