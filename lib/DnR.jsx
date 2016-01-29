import React from "react";
import ReactDOM from "react-dom";

export const defaultTheme = {
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
    padding: 0,
    overflow: 'hidden'
  },
  transition: 'all 0.25s ease-in-out'
};

function prefixedTransition(transition) {
  return transition ? {
    transition: transition,
    WebkitTransition: transition,
    msTransition: transition,
    MozTransition: transition,
    OTransition: transition,
  } : {};
}

export default class DnR extends React.Component {
  constructor(props) {
    super(props);
    const {
      initialWidth,
      initialHeight,
      initialTop,
      initialLeft,
      transition,
      theme
    } = this.props;
    this.cursorX = 0;
    this.cursorY = 0;
    this.clicked = null;
    this.allowTransition = false;
    this.windowPosition = {};
    if (initialWidth) {
      this.windowPosition.width = initialWidth;
    }
    if (initialHeight) {
      this.windowPosition.height = initialHeight;
    }
    if (initialTop) {
      this.windowPosition.top = initialTop;
    }
    if (initialLeft) {
      this.windowPosition.left = initialLeft;
    }
    this.state = {
      cursor: 'auto',
      transition: prefixedTransition(transition ? transition : theme.transition)
    };
  }
  componentDidMount() {
    this.mouseMoveListener = window.addEventListener('mousemove', this._onMove.bind(this));
    this.mouseUpListener = window.addEventListener('mouseup', this._onUp.bind(this));
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.transition !== this.props.transition){
      this.setState({transition: prefixedTransition(nextProps.transition)});
    }
  }
  componentWillUnmount() {
    window.removeEventListener('mousemove', this.mouseMoveListener);
    window.removeEventListener('mousemove', this.mouseUpListener);
  }
  transform(state, allowTransition = true, updateHistory = true) {
    const boundingBox = this.refs.frame.getBoundingClientRect();

    let top = boundingBox.top;
    let left = boundingBox.left;
    let width = boundingBox.width;
    let height = boundingBox.height;

    if (updateHistory) {
      this.prevState = {
        top: top,
        left: left,
        width: width,
        height: height,
      }
    }

    if (!state) return;

    this.windowPosition.top = typeof state.top === 'number' ? state.top :
                                state.bottom ? (state.bottom - (state.height || height)) : top;
    this.windowPosition.left = typeof state.left === 'number' ? state.left :
                                state.right ? (state.right - (state.width || width)) : left;
    this.windowPosition.width = typeof state.width === 'number' ? state.width : 
                                (typeof state.right === 'number' && typeof state.left === 'number') ? state.right - state.left : 
                                typeof state.right === 'number' ? state.right - this.windowPosition.left : width;
    this.windowPosition.height = typeof state.height === 'number' ? state.height : 
                                (typeof state.bottom === 'number' && typeof state.top === 'number') ? state.top - state.bottom : 
                                typeof state.bottom === 'number' ? state.bottom - this.windowPosition.top : height;
    this.allowTransition = allowTransition;    
    this.forceUpdate();
  }
  restore(allowTransition = true) {
    this.transform(this.prevState, allowTransition);
  }
  minimize(allowTransition = true) {
    this.transform({width: 0, height: 0}, allowTransition);
  }
  maximize(allowTransition = true) {
    this.transform({top: 0, left: 0, width: window.innerWidth, height: window.innerHeight}, allowTransition);
  }
  render() {
    const {
      style,
      titleStyle,
      theme,
      minWidth,
      minHeight,
      animate,
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
            this.windowPosition.width = currentWidth;
            this.windowPosition.left = this.cursorX; 
          }
        }

        if (hits.top) {
          let currentHeight = boundingBox.bottom - this.cursorY;
          if (currentHeight > minHeight) {
            this.windowPosition.height = currentHeight;
            this.windowPosition.top = this.cursorY;  
          }
        }
      }
      else if (this.state.cursor === 'move'){
        this.windowPosition.top = boundingBox.top + this.cursorY - this.clicked.y;
        this.windowPosition.left = boundingBox.left + this.cursorX - this.clicked.x;
      }
    }

    let titleBar = (
        <div ref="title"
          style={{
            ...theme.title,
            ...titleStyle
          }}>
          {this.props.title}
        </div>);

    let frameTransition = (animate && this.allowTransition) ? this.state.transition : {};

    return (
      <div ref="frame"
        onMouseDownCapture={this._onDown.bind(this)}
        onMouseMoveCapture={(e)=>{
          if (this.clicked !== null) {
            e.preventDefault();
          }
        }}
        style={{
          ...theme.frame,
          ...frameTransition,
          cursor:this.state.cursor,
          ...style,
          ...this.windowPosition,
        }}
        {...other}>
        {titleBar}
        {this.props.children}
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
    this.allowTransition = false;
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
    theme: React.PropTypes.object,
    minWidth: React.PropTypes.number,
    minHeight: React.PropTypes.number,
    edgeDetectionRange: React.PropTypes.number,
    initialWidth: React.PropTypes.number,
    initialHeight: React.PropTypes.number,
    initialTop: React.PropTypes.number,
    initialLeft: React.PropTypes.number,
    transition: React.PropTypes.string,
    animate: React.PropTypes.bool
};

DnR.defaultProps = {
  minWidth: 20,
  minHeight: 20,
  edgeDetectionRange: 4,
  theme: defaultTheme,
  initialWidth: null,
  initialHeight: null,
  initialTop: null,
  initialLeft: null,
  animate: true,
};