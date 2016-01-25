import React from "react";
import ReactDOM from "react-dom";

export const defaultStyles = {
  title: {
    textAlign: 'center',
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
    padding: 0,
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
    OTransform: 'all 0.25s ease-in-out',
  }
};

export default class DnR extends React.Component {
  constructor(props) {
    super(props);
    this.cursorX = 0;
    this.cursorY = 0;
    this.clicked = null;
    this.windowPosition = {};
    if (this.props.initialWidth) {
      this.windowPosition.width = this.props.initialWidth;
    }
    if (this.props.initialHeight) {
      this.windowPosition.height = this.props.initialHeight;
    }
    this.state = {
      cursor: 'auto',
    };
  }
  componentDidMount() {
    this.mouseMoveListener = window.addEventListener('mousemove', this._onMove.bind(this));
    this.mouseUpListener = window.addEventListener('mouseup', this._onUp.bind(this));
  }
  componentDidUpdate() {
  }
  componentWillUnmount() {
    window.removeEventListener('mousemove', this.mouseMoveListener);
    window.removeEventListener('mousemove', this.mouseUpListener);
  }
  render() {
    const {
      style,
      titleStyle,
      snapShadowStyle,
      styles,
      minWidth,
      minHeight,
      canSnap,
      ...other,
    } = this.props;

    if (this.clicked) {
      let hits = this.hitEdges;
      const boundingBox = this.clicked.boundingBox;

      if (hits.top || hits.bottom || hits.left || hits.right) {
        if (hits.right) this.windowPosition.width = Math.max(this.cursorX - boundingBox.left, minWidth) + 'px';
        if (hits.bottom) this.windowPosition.height = Math.max(this.cursorY - boundingBox.top, minHeight) + 'px';

        if (hits.left) {
          let currentWidth = boundingBox.right - this.cursorX;
          if (currentWidth > minWidth) {
            this.windowPosition.width = currentWidth + 'px';
            this.windowPosition.left = this.cursorX + 'px'; 
          }
        }

        if (hits.top) {
          let currentHeight = boundingBox.bottom - this.cursorY;
          if (currentHeight > minHeight) {
            this.windowPosition.height = currentHeight + 'px';
            this.windowPosition.top = this.cursorY + 'px';  
          }
        }
      }
      else if (this.state.cursor === 'move'){
        this.windowPosition.top = boundingBox.top + this.cursorY - this.clicked.y + 'px';
        this.windowPosition.left = boundingBox.left + this.cursorX - this.clicked.x + 'px';
      }
    }

    let titleBar = (
        <div ref="title"
          style={{...styles.title, ...titleStyle}}>
          {this.props.title}
        </div>);
    let snapShadow = canSnap ? (
      <div ref="snapShadow" style={{...styles.snapShadow, ...snapShadowStyle}}>
      </div>) : null;

    return (
      <div ref="frame"
        onMouseDownCapture={this._onDown.bind(this)}
        onMouseMoveCapture={(e)=>{
          if (this.clicked !== null) {
            e.preventDefault();
          }
        }}
        style={{...styles.frame, cursor:this.state.cursor, ...style, ...this.windowPosition}}
        {...other}>
        {titleBar}
        {this.props.children}
        {snapShadow}
      </div>
    );
  }
  _cursorStatus(e){
    const boundingBox = this.refs.frame.getBoundingClientRect();
    this.cursorX = e.clientX;
    this.cursorY = e.clientY;

    if (this.clicked) return;

    let hitRange = this.props.edgeDetectionRange;
    let hitTop = this.cursorY <= boundingBox.top + hitRange;
    let hitBottom = this.cursorY >= boundingBox.bottom - hitRange;
    let hitLeft = this.cursorX <= boundingBox.left + hitRange;
    let hitRight = this.cursorX >= boundingBox.right - hitRange;

    let cursor = 'auto';

    if (hitTop || hitBottom || hitLeft || hitRight){
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
    }
    else {
      const titleBounding = this.refs.title.getBoundingClientRect();
      if (this.cursorX > titleBounding.left && this.cursorX < titleBounding.right &&
          this.cursorY > titleBounding.top && this.cursorY < titleBounding.bottom) {
        cursor = 'move';
      }
    }

    this.hitEdges = {
      top: hitTop,
      bottom: hitBottom,
      left: hitLeft,
      right: hitRight
    };

    if (cursor !== this.state.cursor){
      this.setState({cursor:cursor});
    }

  }
  _onDown(e){
    this._cursorStatus(e);
    const boundingBox = this.refs.frame.getBoundingClientRect();
    this.clicked = {x: e.clientX, y: e.clientY, boundingBox: boundingBox};
  }
  _onUp(e){
    this.clicked = null;
    this._cursorStatus(e);
  }
  _onMove(e){
    this._cursorStatus(e);
    if (this.clicked !== null) {
      this.forceUpdate();
    }
  }
}

DnR.propTypes = {
    title: React.PropTypes.oneOfType([
      React.PropTypes.object,
      React.PropTypes.string,
    ]),
    style: React.PropTypes.object,
    titleStyle: React.PropTypes.object,
    canSnap: React.PropTypes.bool,
    snapShadowStyle: React.PropTypes.object,
    styles: React.PropTypes.object,
    minWidth: React.PropTypes.number,
    minHeight: React.PropTypes.number,
    edgeDetectionRange: React.PropTypes.number,
    initialWidth: React.PropTypes.number,
    initialHeight: React.PropTypes.number,
};

DnR.defaultProps = {
  minWidth: 20,
  minHeight: 20,
  edgeDetectionRange: 4,
  styles: defaultStyles,
  canSnap: false,
  initialWidth: null,
  initialHeight: null,
};