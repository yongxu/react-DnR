import React from "react";
import {defaultTheme} from './DnR';

export class Button extends React.Component {
  constructor(props) {
    super(props);
  	
  	this.state = {
  		hover: false,
  		down: false,
  	};
  }
  render() {
    const {
      style,
      hoverStyle,
      downStyle,
      children,
      ...other,
    } = this.props;

  	let buttonStyle = {
  		...style,
  		...(this.state.hover ? hoverStyle : {}),
  		...(this.state.down ? downStyle : {})
  	};
  	return (
  		<button
  			onMouseEnter={()=>this.setState({hover:true})}
  			onMouseLeave={()=>this.setState({hover:false,down:false})}
  			onMouseDown={()=>this.setState({down:true})}
  			onMouseUp={()=>this.setState({down:false})}
  			style={buttonStyle}
  			{...other}>
  			{children}
  		</button>);
  }
}

export const TitleBar = ({
	children,
	buttons,
	closeButton,
	minimizeButton,
	maximizeButton,
	...other
}) =>
	<div {...other}>
		<div {...buttons}>
			<Button {...closeButton} alt="close">
			</Button>
			<Button {...minimizeButton} alt="minimize">
			</Button>
			<Button {...maximizeButton} alt="maximize">
			</Button>
		</div>
		{children}
	</div>

export let OSXTheme = ({title, onClose, onMinimize, onMaximize}) => {
	const titleHeight = 25;
	const buttonRadius = 6;
	const fontSize = 14;
	const fontFamily = 'Helvetica, sans-serif';

	const style = {
			height: titleHeight,
	};

	const buttonStyle = {
		padding: 0,
		margin: 0,
		marginRight: '4px',
		width: buttonRadius * 2,
		height: buttonRadius * 2,
		borderRadius: buttonRadius,
		content: '',
		border: '1px solid rgba(0, 0, 0, 0.2)',
		outline: 'none',
	};
	const buttons = {
		style: {
			height: titleHeight,
			position: 'absolute',
			float: 'left',
			margin: '0 8px',
			display: 'flex',
			alignItems: 'center'
		}
	};

	const closeButton = {
		style: {
			...buttonStyle,
			backgroundColor: 'rgb(255, 97, 89)',
		},
		hoverStyle: {
			backgroundColor: 'rgb(230, 72, 64)'
		},
		downStyle: {
			backgroundColor: 'rgb(204, 46, 38)'
		},
		onClick: onClose
	};
	const minimizeButton = {
		style: {
			...buttonStyle,
			backgroundColor: 'rgb(255, 191, 47)'
		},
		hoverStyle: {
			backgroundColor: 'rgb(230, 166, 22)'
		},
		downStyle: {
			backgroundColor: 'rgb(204, 140, 0)'
		},
		onClick: onMinimize
	};
	const maximizeButton = {
		style: {
			...buttonStyle,
			backgroundColor: 'rgb(37, 204, 62)'
		},
		hoverStyle: {
			backgroundColor: 'rgb(12, 179, 37)'
		},
		downStyle: {
			backgroundColor: 'rgb(0, 153, 11)'
		},
		onClick: onMaximize
	};
	return {
		theme: {
			title: {
				...defaultTheme.title,
				fontFamily: fontFamily,
				borderTopLeftRadius: '5px',
				borderTopRightRadius: '5px',
				background: 'linear-gradient(0deg, #d8d8d8, #ececec)',
				color: 'rgba(0, 0, 0, 0.7)',
				fontSize: fontSize,
				height: titleHeight,
			},
			frame: {
				...defaultTheme.frame,
				borderRadius: '5px',
			},
		  transition: 'all 0.25s ease-in-out'
		},
		titleBar: (<TitleBar
				style={style}
				buttons={buttons}
				closeButton={closeButton}
				minimizeButton={minimizeButton}
				maximizeButton={maximizeButton}>
					<div style={{
						width: '100%',
						height: '100%',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center'
					}}>
						{title}
					</div>
			</TitleBar>),
	};
};