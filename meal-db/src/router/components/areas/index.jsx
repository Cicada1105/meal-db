import React, { useEffect } from 'react';

function Areas() {
	useEffect(() => {
		console.log("Areas component mounted");
	})
	return(
		<div>Areas</div>
	);
}

export { Areas }