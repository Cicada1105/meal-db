import React from 'react';

import shadow1 from './shadow_1.png';
import shadow2 from './shadow_2.png';
import shadow3 from './shadow_3.png';

class Background extends React.Component {
	componentDidMount() {
		let cvs = document.querySelector("#backgroundCvs");
		let ctx = cvs.getContext('2d');

		let grd = ctx.createLinearGradient(0,0,0,150);

		grd.addColorStop(0,"rgb(178,180,248)");
		grd.addColorStop(1,"#8bd8ff");

		ctx.fillStyle = grd;
		ctx.globalAlpha = 0.7;
		ctx.fillRect(0,0,300,150);
	}
	render() {
		return(
			<React.Fragment>
				<img src={ shadow1 } className="shadow" id="topRight" alt="Shadow 1" />
				<img src={ shadow2 } className="shadow" id="bottomLeft" alt="Shadow 2" />
				<img src={ shadow3 } className="shadow" id="bottomRight" alt="Shadow 3" />
				<canvas id="backgroundCvs" />
			</React.Fragment>
		)
	}
}

export { Background }