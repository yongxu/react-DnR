import React from "react";
import {defaultStyles} from './DnR';

export const TitleBar = ({children}) =>
	<div>
		<div>
			<button alt="close">
			</button>
			<button alt="minimize">
			</button>
			<button alt="maximize">
			</button>
		</div>
		<span>{children}</span>
	</div>

export let OSXTheme = (title) => {

	const buttonStyle = {

	};
	return {
		styles: defaultStyles,
		style:{
			border: '1px solid',
			borderRadius: '5px'
		},
		title: (<TitleBar>title</TitleBar>),
		titleStyle: {
			fontFamily: 'monospace',
			background: 'blue',
			color: 'white',
			fontSize: '24px',
			height: '30px'
		},
	};
};