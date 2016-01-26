import React from "react";
import ReactDOM from "react-dom";
import DnR from '../lib/DnR';

import {OSXTheme} from '../lib/addons';
let paneStyle = {
	width: '50%',
	height: '50%',
	top: '25%',
	left: '25%',
	backgroundColor: 'rgb(37, 204, 62)'
}

let OSX = OSXTheme('test');

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
		<DnR {...OSX} style={paneStyle}>
			content
		</DnR>
	</div>
), document.getElementById("main"));