"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.OSXTheme = exports.TitleBar = undefined;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _DnR = require("./DnR");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var TitleBar = exports.TitleBar = function TitleBar(_ref) {
	var children = _ref.children;
	var buttons = _ref.buttons;
	var closeButton = _ref.closeButton;
	var minimizeButton = _ref.minimizeButton;
	var maximizeButton = _ref.maximizeButton;

	var other = _objectWithoutProperties(_ref, ["children", "buttons", "closeButton", "minimizeButton", "maximizeButton"]);

	return _react2.default.createElement(
		"div",
		other,
		_react2.default.createElement(
			"div",
			buttons,
			_react2.default.createElement("button", _extends({}, closeButton, { alt: "close" })),
			_react2.default.createElement("button", _extends({}, minimizeButton, { alt: "minimize" })),
			_react2.default.createElement("button", _extends({}, maximizeButton, { alt: "maximize" }))
		),
		children
	);
};

var OSXTheme = exports.OSXTheme = function OSXTheme(title) {
	var titleHeight = 25;
	var buttonRadius = 6;
	var fontSize = 14;
	var fontFamily = 'Helvetica, sans-serif';

	var style = {
		height: titleHeight
	};

	var buttonStyle = {
		padding: 0,
		margin: 0,
		marginRight: '4px',
		width: buttonRadius * 2,
		height: buttonRadius * 2,
		borderRadius: buttonRadius,
		border: '1px solid rgba(0, 0, 0, 0.2)'
	};
	var buttons = {
		style: {
			height: titleHeight,
			position: 'absolute',
			float: 'left',
			margin: '0 8px',
			display: 'flex',
			alignItems: 'center'
		}
	};

	var closeButton = {
		style: _extends({}, buttonStyle, {
			backgroundColor: 'rgb(255, 97, 89)'
		})
	};
	var minimizeButton = {
		style: _extends({}, buttonStyle, {
			backgroundColor: 'rgb(255, 191, 47)'
		})
	};
	var maximizeButton = {
		style: _extends({}, buttonStyle, {
			backgroundColor: 'rgb(37, 204, 62)'
		})
	};
	return {
		theme: {
			title: _extends({}, _DnR.defaultTheme.title, {
				fontFamily: fontFamily,
				borderTopLeftRadius: '5px',
				borderTopRightRadius: '5px',
				background: 'linear-gradient(0deg, #d8d8d8, #ececec)',
				color: 'rgba(0, 0, 0, 0.7)',
				fontSize: fontSize,
				height: titleHeight
			}),
			frame: _extends({}, _DnR.defaultTheme.frame, {
				borderRadius: '5px'
			}),
			snapShadow: _DnR.defaultTheme.snapShadow
		},
		title: _react2.default.createElement(
			TitleBar,
			{
				style: style,
				buttons: buttons,
				closeButton: closeButton,
				minimizeButton: minimizeButton,
				maximizeButton: maximizeButton },
			_react2.default.createElement(
				"div",
				{ style: {
						width: '100%',
						height: '100%',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center'
					} },
				title
			)
		)
	};
};