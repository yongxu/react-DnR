"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultTheme = undefined;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var defaultTheme = exports.defaultTheme = {
  title: {
    userSelect: 'none',
    WebkitUserSelect: 'none',
    msUserSelect: 'none',
    MozUserSelect: 'none',
    OUserSelect: 'none',
    overflow: 'hidden'
  },
  frame: {
    position: 'absolute',
    margin: 0,
    padding: 0
  },
  snapShadow: {
    background: '#999',
    opacity: 0.2,
    position: 'absolute',
    margin: 0,
    padding: 0,
    transition: 'all 0.25s ease-in-out',
    WebkitTransition: 'all 0.25s ease-in-out',
    msTransition: 'all 0.25s ease-in-out',
    MozTransform: 'all 0.25s ease-in-out',
    OTransform: 'all 0.25s ease-in-out'
  }
};

var DnR = function (_React$Component) {
  _inherits(DnR, _React$Component);

  function DnR(props) {
    _classCallCheck(this, DnR);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(DnR).call(this, props));

    _this.cursorX = 0;
    _this.cursorY = 0;
    _this.clicked = null;
    _this.windowPosition = {};
    if (_this.props.initialWidth) {
      _this.windowPosition.width = _this.props.initialWidth;
    }
    if (_this.props.initialHeight) {
      _this.windowPosition.height = _this.props.initialHeight;
    }
    _this.state = {
      cursor: 'auto'
    };
    return _this;
  }

  _createClass(DnR, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.mouseMoveListener = window.addEventListener('mousemove', this._onMove.bind(this));
      this.mouseUpListener = window.addEventListener('mouseup', this._onUp.bind(this));
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {}
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      window.removeEventListener('mousemove', this.mouseMoveListener);
      window.removeEventListener('mousemove', this.mouseUpListener);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _props = this.props;
      var style = _props.style;
      var titleStyle = _props.titleStyle;
      var snapShadowStyle = _props.snapShadowStyle;
      var theme = _props.theme;
      var minWidth = _props.minWidth;
      var minHeight = _props.minHeight;
      var canSnap = _props.canSnap;

      var other = _objectWithoutProperties(_props, ["style", "titleStyle", "snapShadowStyle", "theme", "minWidth", "minHeight", "canSnap"]);

      if (this.clicked) {
        var hits = this.hitEdges;
        var boundingBox = this.clicked.boundingBox;

        if (hits.top || hits.bottom || hits.left || hits.right) {
          if (hits.right) this.windowPosition.width = Math.max(this.cursorX - boundingBox.left, minWidth) + 'px';
          if (hits.bottom) this.windowPosition.height = Math.max(this.cursorY - boundingBox.top, minHeight) + 'px';

          if (hits.left) {
            var currentWidth = boundingBox.right - this.cursorX;
            if (currentWidth > minWidth) {
              this.windowPosition.width = currentWidth + 'px';
              this.windowPosition.left = this.cursorX + 'px';
            }
          }

          if (hits.top) {
            var currentHeight = boundingBox.bottom - this.cursorY;
            if (currentHeight > minHeight) {
              this.windowPosition.height = currentHeight + 'px';
              this.windowPosition.top = this.cursorY + 'px';
            }
          }
        } else if (this.state.cursor === 'move') {
          this.windowPosition.top = boundingBox.top + this.cursorY - this.clicked.y + 'px';
          this.windowPosition.left = boundingBox.left + this.cursorX - this.clicked.x + 'px';
        }
      }

      var titleBar = _react2.default.createElement(
        "div",
        { ref: "title",
          style: _extends({}, theme.title, titleStyle) },
        this.props.title
      );
      var snapShadow = canSnap ? _react2.default.createElement("div", { ref: "snapShadow", style: _extends({}, theme.snapShadow, snapShadowStyle) }) : null;

      return _react2.default.createElement(
        "div",
        _extends({ ref: "frame",
          onMouseDownCapture: this._onDown.bind(this),
          onMouseMoveCapture: function onMouseMoveCapture(e) {
            if (_this2.clicked !== null) {
              e.preventDefault();
            }
          },
          style: _extends({}, theme.frame, { cursor: this.state.cursor }, style, this.windowPosition)
        }, other),
        titleBar,
        this.props.children,
        snapShadow
      );
    }
  }, {
    key: "_cursorStatus",
    value: function _cursorStatus(e) {
      var boundingBox = this.refs.frame.getBoundingClientRect();
      this.cursorX = e.clientX;
      this.cursorY = e.clientY;

      if (this.clicked) return;

      var hitRange = this.props.edgeDetectionRange;
      var hitTop = this.cursorY <= boundingBox.top + hitRange;
      var hitBottom = this.cursorY >= boundingBox.bottom - hitRange;
      var hitLeft = this.cursorX <= boundingBox.left + hitRange;
      var hitRight = this.cursorX >= boundingBox.right - hitRange;

      var cursor = 'auto';

      if (hitTop || hitBottom || hitLeft || hitRight) {
        if (hitRight && hitBottom || hitLeft && hitTop) {
          cursor = 'nwse-resize';
        } else if (hitRight && hitTop || hitBottom && hitLeft) {
          cursor = 'nesw-resize';
        } else if (hitRight || hitLeft) {
          cursor = 'ew-resize';
        } else if (hitBottom || hitTop) {
          cursor = 'ns-resize';
        }
        e.stopPropagation();
      } else {
        var titleBounding = this.refs.title.getBoundingClientRect();
        if (this.cursorX > titleBounding.left && this.cursorX < titleBounding.right && this.cursorY > titleBounding.top && this.cursorY < titleBounding.bottom) {
          cursor = 'move';
        }
      }

      this.hitEdges = {
        top: hitTop,
        bottom: hitBottom,
        left: hitLeft,
        right: hitRight
      };

      if (cursor !== this.state.cursor) {
        this.setState({ cursor: cursor });
      }
    }
  }, {
    key: "_onDown",
    value: function _onDown(e) {
      this._cursorStatus(e);
      var boundingBox = this.refs.frame.getBoundingClientRect();
      this.clicked = { x: e.clientX, y: e.clientY, boundingBox: boundingBox };
    }
  }, {
    key: "_onUp",
    value: function _onUp(e) {
      this.clicked = null;
      this._cursorStatus(e);
    }
  }, {
    key: "_onMove",
    value: function _onMove(e) {
      this._cursorStatus(e);
      if (this.clicked !== null) {
        this.forceUpdate();
      }
    }
  }]);

  return DnR;
}(_react2.default.Component);

exports.default = DnR;

DnR.propTypes = {
  title: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.object, _react2.default.PropTypes.string]),
  style: _react2.default.PropTypes.object,
  titleStyle: _react2.default.PropTypes.object,
  canSnap: _react2.default.PropTypes.bool,
  snapShadowStyle: _react2.default.PropTypes.object,
  theme: _react2.default.PropTypes.object,
  minWidth: _react2.default.PropTypes.number,
  minHeight: _react2.default.PropTypes.number,
  edgeDetectionRange: _react2.default.PropTypes.number,
  initialWidth: _react2.default.PropTypes.number,
  initialHeight: _react2.default.PropTypes.number
};

DnR.defaultProps = {
  minWidth: 20,
  minHeight: 20,
  edgeDetectionRange: 4,
  theme: defaultTheme,
  canSnap: false,
  initialWidth: null,
  initialHeight: null
};