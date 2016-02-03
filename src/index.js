import React from "react";
import ReactDOM from "react-dom";
import DnR from '../modules/DnR';

import {OSXTheme, WindowsTheme} from '../modules/themes';
let paneStyle = {
	width: '50%',
	height: '50%',
	top: '25%',
	left: '25%',
	backgroundColor: 'rgba(0, 0, 0, 0.2)'
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      minimize: false
    };
		this.OSX = OSXTheme({
			title: 'OSX Theme',
			onClose: ()=>this.refs.subdnr.minimize(),
			onMinimize: ()=>this.refs.subdnr.minimize(),
			onMaximize: ()=>this.refs.subdnr.maximize(),
		});
		this.Windows = WindowsTheme({
			title: 'Windows Theme',
			onClose: ()=>this.refs.dnr.minimize(),
			onMinimize: ()=>this.refs.dnr.minimize(),
			onMaximize: ()=>this.refs.dnr.maximize(),
		});
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
				<DnR
					ref='dnr'
					{...this.Windows}
					cursorRemap={(c) => c === 'move' ? 'default' : null} 
					style={paneStyle}>
					<DnR
						ref='subdnr'
						{...this.OSX}
						cursorRemap={(c) => c === 'move' ? 'default' : null} 
						style={paneStyle}
						boundary={{top: 0}}>
						content
					</DnR>
				</DnR>
			</div>
		);
	}
}


ReactDOM.render(<App/>, document.getElementById("main"));