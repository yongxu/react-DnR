'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var style = {
  snapShadow: {
    background: '#999',
    opacity: 0.2,
    position: 'absolute',
    margin: 0,
    padding: 0,
    top: 0,
    width: '100%',
    height: '100%',
    zIndex: -1
  }
};

var Shadow = function (_React$Component) {
  _inherits(Shadow, _React$Component);

  function Shadow() {
    _classCallCheck(this, Shadow);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Shadow).apply(this, arguments));
  }

  _createClass(Shadow, [{
    key: 'render',
    value: function render() {
      return this.props.canSnap ? React.createElement('div', { ref: 'snapShadow', style: _extends({}, style, this.props.style) }) : null;
    }
  }]);

  return Shadow;
}(React.Component);

exports.default = Shadow;