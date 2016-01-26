import React from "react";
import {defaultTheme} from './DnR';

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
			<button {...closeButton} alt="close">
			</button>
			<button {...minimizeButton} alt="minimize">
			</button>
			<button {...maximizeButton} alt="maximize">
			</button>
		</div>
		{children}
	</div>

export let OSXTheme = (title) => {
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
		border: '1px solid rgba(0, 0, 0, 0.2)'
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
			backgroundColor: 'rgb(255, 97, 89)'
		}
	};
	const minimizeButton = {
		style: {
			...buttonStyle,
			backgroundColor: 'rgb(255, 191, 47)'
		}
	};
	const maximizeButton = {
		style: {
			...buttonStyle,
			backgroundColor: 'rgb(37, 204, 62)'
		}
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
			snapShadow: defaultTheme.snapShadow,
		},
		title: (<TitleBar
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