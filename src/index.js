import React from "react";
import ReactDOM from "react-dom";
import DnR from '../lib/DnR';

import {OSXTheme} from '../lib/addons';
let paneStyle = {
	width: '50%',
	height: '50%',
	top: '25%',
	left: '25%',
	backgroundColor: 'rgba(0, 0, 0, 0.2)'
}

let OSX = OSXTheme('test');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      minimize: false
    };
	}
	render() {
		return (
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
				<button onClick={()=>this.refs.dnr.minimize()}>
					minimize
				</button>
				<button onClick={()=>this.refs.dnr.maximize()}>
					maximize
				</button>
				<button onClick={()=>this.refs.dnr.restore()}>
					restore
				</button>
				<DnR ref='dnr' {...OSX} style={paneStyle}>
					content
				</DnR>
			</div>
		);
	}
}


ReactDOM.render(<App/>, document.getElementById("main"));