'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.WindowsTheme = exports.OSXTheme = exports.TitleBar = exports.Button = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _DnR = require('./DnR');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Button = exports.Button = function (_React$Component) {
	_inherits(Button, _React$Component);

	function Button(props) {
		_classCallCheck(this, Button);

		var _this = _possibleConstructorReturn(this, (Button.__proto__ || Object.getPrototypeOf(Button)).call(this, props));

		_this.state = {
			hover: false,
			down: false
		};
		return _this;
	}

	_createClass(Button, [{
		key: 'render',
		value: function render() {
			var _this2 = this;

			var _props = this.props,
			    style = _props.style,
			    hoverStyle = _props.hoverStyle,
			    downStyle = _props.downStyle,
			    children = _props.children,
			    cursor = _props.cursor,
			    other = _objectWithoutProperties(_props, ['style', 'hoverStyle', 'downStyle', 'children', 'cursor']);

			var dragging = /resize$/.test(cursor);

			var buttonStyle = _extends({}, style, this.state.hover && !dragging ? hoverStyle : {}, this.state.down && !dragging ? downStyle : {}, {
				cursor: cursor
			});

			return _react2.default.createElement(
				'button',
				_extends({
					onMouseEnter: function onMouseEnter() {
						return _this2.setState({ hover: true });
					},
					onMouseLeave: function onMouseLeave() {
						return _this2.setState({ hover: false, down: false });
					},
					onMouseDown: function onMouseDown() {
						return _this2.setState({ down: true });
					},
					onMouseUp: function onMouseUp() {
						return _this2.setState({ down: false });
					},
					style: buttonStyle
				}, other),
				children
			);
		}
	}]);

	return Button;
}(_react2.default.Component);

var TitleBar = exports.TitleBar = function TitleBar(_ref) {
	var children = _ref.children,
	    buttons = _ref.buttons,
	    button1 = _ref.button1,
	    button2 = _ref.button2,
	    button3 = _ref.button3,
	    button1Children = _ref.button1Children,
	    button2Children = _ref.button2Children,
	    button3Children = _ref.button3Children,
	    dnrState = _ref.dnrState;
	return _react2.default.createElement(
		'div',
		null,
		_react2.default.createElement(
			'div',
			buttons,
			_react2.default.createElement(
				Button,
				_extends({}, button1, { cursor: dnrState.cursor }),
				button1Children
			),
			_react2.default.createElement(
				Button,
				_extends({}, button2, { cursor: dnrState.cursor }),
				button2Children
			),
			_react2.default.createElement(
				Button,
				_extends({}, button3, { cursor: dnrState.cursor }),
				button3Children
			)
		),
		children
	);
};

var OSXTheme = exports.OSXTheme = function OSXTheme(_ref2) {
	var title = _ref2.title,
	    onClose = _ref2.onClose,
	    onMinimize = _ref2.onMinimize,
	    onMaximize = _ref2.onMaximize;

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
		content: '',
		border: '1px solid rgba(0, 0, 0, 0.2)',
		outline: 'none'
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
		}),
		hoverStyle: {
			backgroundColor: 'rgb(230, 72, 64)'
		},
		downStyle: {
			backgroundColor: 'rgb(204, 46, 38)'
		},
		onClick: onClose
	};
	var minimizeButton = {
		style: _extends({}, buttonStyle, {
			backgroundColor: 'rgb(255, 191, 47)'
		}),
		hoverStyle: {
			backgroundColor: 'rgb(230, 166, 22)'
		},
		downStyle: {
			backgroundColor: 'rgb(204, 140, 0)'
		},
		onClick: onMinimize
	};
	var maximizeButton = {
		style: _extends({}, buttonStyle, {
			backgroundColor: 'rgb(37, 204, 62)'
		}),
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
			transition: 'all 0.25s ease-in-out'
		},
		titleBar: _react2.default.createElement(
			TitleBar,
			{
				style: style,
				buttons: buttons,
				button1: closeButton,
				button2: minimizeButton,
				button3: maximizeButton },
			_react2.default.createElement(
				'div',
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

var WindowsTheme = exports.WindowsTheme = function WindowsTheme(_ref3) {
	var title = _ref3.title,
	    onClose = _ref3.onClose,
	    onMinimize = _ref3.onMinimize,
	    onMaximize = _ref3.onMaximize,
	    _ref3$titleBarColor = _ref3.titleBarColor,
	    titleBarColor = _ref3$titleBarColor === undefined ? '#0095ff' : _ref3$titleBarColor;

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
		width: 25,
		height: 25,
		outline: 'none',
		border: 'none',
		textAlign: 'center'
	};

	var buttons = {
		style: {
			height: titleHeight,
			position: 'absolute',
			right: 0,
			margin: 0,
			display: 'flex',
			alignItems: 'center',
			verticalAlign: 'baseline'
		}
	};

	var closeButton = {
		style: _extends({}, buttonStyle, {
			fontSize: '20px',
			fontWeight: 500,
			lineHeight: '36px',
			backgroundColor: titleBarColor
		}),
		hoverStyle: {
			backgroundColor: '#ec6060'
		},
		downStyle: {
			backgroundColor: '#bc4040'
		},
		onClick: onClose
	};

	var minimizeButton = {
		style: _extends({}, buttonStyle, {
			lineHeight: '22px',
			backgroundColor: titleBarColor
		}),
		hoverStyle: {
			backgroundColor: 'rgba(0, 0, 0, 0.1)'
		},
		downStyle: {
			backgroundColor: 'rgba(0, 0, 0, 0.2)'
		},
		onClick: onMinimize
	};

	var maximizeButton = {
		style: _extends({}, buttonStyle, {
			lineHeight: '12px',
			backgroundColor: titleBarColor
		}),
		hoverStyle: {
			backgroundColor: 'rgba(0, 0, 0, 0.1)'
		},
		downStyle: {
			backgroundColor: 'rgba(0, 0, 0, 0.2)'
		},
		onClick: onMaximize
	};
	return {
		theme: {
			title: _extends({}, _DnR.defaultTheme.title, {
				fontFamily: fontFamily,
				background: titleBarColor,
				color: 'rgba(0, 0, 0, 0.7)',
				fontSize: fontSize,
				height: titleHeight
			}),
			frame: _extends({}, _DnR.defaultTheme.frame),
			transition: 'all 0.25s ease-in-out'
		},
		titleBar: _react2.default.createElement(
			TitleBar,
			{
				style: style,
				buttons: buttons,
				button1: minimizeButton,
				button2: maximizeButton,
				button3: closeButton,
				button1Children: '\u2012',
				button2Children: '\u25A1',
				button3Children: '\u02DF' },
			_react2.default.createElement(
				'div',
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