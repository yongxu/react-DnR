import React from "react";
import ReactDOM from "react-dom";
import DnR from '../lib/DnR';

import theme from '../lib/addons';
let paneStyle = {
	width: '50%',
	height: '50%',
	top: '25%',
	left: '25%',
	background: '#090',
	border: '2px solid',
	borderRadius: '5px'
}



ReactDOM.render((
	<div style={{
		background:'#3a7bd5',
		top: 0,
		left : 0,
		width: '100%',
		height: '100%',
		position: 'fixed',
		backgroundImage: `url(${require('../img/bg1.png')})`
//		backgroundImage: '-webkit-radial-gradient(top, circle cover, #00d2ff 0%, #3a7bd5 80%)'
	}}>
		<DnR
			style={paneStyle}
			title={<span>test</span>}
			titleStyle={{
				fontFamily: 'monospace',
				background: 'blue',
				color: 'white',
				fontSize: '24px',
				height: '30px'
			}}>
			content
		</DnR>
	</div>
), document.getElementById("main"));