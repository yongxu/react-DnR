import React from "react";
import ReactDOM from "react-dom";

const defaultStyles = {
	title: {
		textAlign: 'center'
	},
	pane: {
		position: 'absolute',
		margin: 0,
		padding: 0,
		border: '2px solid',
	},
	shadowPane: {
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
		this.isResizing = false;
	  this.panePosition = {};
		this.state = {
			canDrag: false,
			width: this.props.initialWidth,
			height: this.props.initialHeight,
			hitEdges: {
				top: false,
				bottom: false,
				left: false,
				right: false
			}
		};
	}
	componentDidMount() {
		this.mouseMoveListener = window.addEventListener('mousemove', this._onMove.bind(this));
	}
	componentDidUpdate() {
	}
	componentWillUnmount() {
		window.removeEventListener('mousemove', this.mouseMoveListener);
	}
	render() {
		const {
      style,
      titleStyle,
      shadowPaneStyle,
      minWidth,
      minHeight,
      ...other,
    } = this.props;

    let cursor;
    let hits = this.state.hitEdges;
		if (hits.right && hits.bottom || hits.left && hits.top) {
	    cursor = 'nwse-resize';
	  } else if (hits.right && hits.top || hits.bottom && hits.left) {
	    cursor = 'nesw-resize';
	  } else if (hits.right || hits.left) {
	    cursor = 'ew-resize';
	  } else if (hits.bottom || hits.top) {
	    cursor = 'ns-resize';
	  } else if (this.state.canDrag) {
	    cursor = 'move';
	  } else {
	    cursor = 'default';
	  }

	  if (this.isResizing && this.clicked !== null
	  		&& (hits.top || hits.bottom || hits.left || hits.right)) {
	  	const boundingBox = this.clicked.boundingBox;

	  	if (hits.right) this.panePosition.width = Math.max(this.cursorX - boundingBox.left, minWidth) + 'px';
	    if (hits.bottom) this.panePosition.height = Math.max(this.cursorY - boundingBox.top, minHeight) + 'px';

	    if (hits.left) {
	      let currentWidth = boundingBox.right - this.cursorX;
	      if (currentWidth > minWidth) {
	        this.panePosition.width = currentWidth + 'px';
	        this.panePosition.left = this.cursorX + 'px';	
	      }
	    }

	    if (hits.top) {
	      let currentHeight = boundingBox.bottom - this.cursorY;
	      if (currentHeight > minHeight) {
	        this.panePosition.height = currentHeight + 'px';
	        this.panePosition.top = this.cursorY + 'px';	
	      }
	    }
	  }

		return (
			<div ref="pane"
				onMouseDownCapture={this._onDown.bind(this)}
				onMouseUpCapture={this._onUp.bind(this)}
				style={{...defaultStyles.pane, cursor:cursor, ...style, ...this.panePosition}}>
				<div ref="title"
					style={{...defaultStyles.title, ...titleStyle}}>
					{this.props.title}
				</div>
				{this.props.children}
				<div ref="shadowPane" style={{...defaultStyles.shadowPane, ...shadowPaneStyle}}></div>
			</div>
		);
	}
	_cursorStatus(e){
		const boundingBox = this.refs.pane.getBoundingClientRect();
		this.cursorX = e.clientX;
		this.cursorY = e.clientY;
		let hitRange = this.props.edgeDetectionRange;

		let hitTop = this.cursorY <= boundingBox.top + hitRange;
		let hitBottom = this.cursorY >= boundingBox.bottom - hitRange;
		let hitLeft = this.cursorX <= boundingBox.left + hitRange;
		let hitRight = this.cursorX >= boundingBox.right - hitRange;

		let prevHits = this.state.hitEdges;
		if (hitTop !== prevHits.top || hitBottom !== prevHits.bottom ||
				hitLeft !== prevHits.left || hitRight !== prevHits.right)	{
			this.setState({
				hitEdges: {
					top: hitTop,
					bottom: hitBottom,
					left: hitLeft,
					right: hitRight
				}
			});
		}

		if (hitTop || hitBottom || hitLeft || hitRight){
			if (this.state.canDrag === true)
				this.setState({canDrag:false});
			e.stopPropagation();
		}
		else {
			const titleBounding = this.refs.title.getBoundingClientRect();
			if (this.cursorX > titleBounding.left && this.cursorX < titleBounding.right &&
					this.cursorY > titleBounding.top && this.cursorY < titleBounding.bottom) {
				if (this.state.canDrag === false) {
					this.isResizing = false;
					this.setState({canDrag:true});
				}
			}
			else if (this.state.canDrag === true) {
				this.setState({canDrag:false});
			}
		}
	}
	_onDown(e){
		this._cursorStatus(e);
		const boundingBox = this.refs.pane.getBoundingClientRect();
		this.clicked = {x: e.clientX, y: e.clientY, boundingBox: boundingBox};
	}
	_onUp(e){
		this._cursorStatus(e);
		this.clicked = null;
		this.isResizing = false;
	}
	_onMove(e){
		this._cursorStatus(e);
		if (this.clicked !== null) {
			this.isResizing = true;
			this.forceUpdate();
		}
		else{
			this.isResizing = false;
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
    shadowPaneStyle: React.PropTypes.object,
    minWidth: React.PropTypes.number,
    minHeight: React.PropTypes.number,
    edgeDetectionRange: React.PropTypes.number,
    initialWidth: React.PropTypes.number,
    initialHeight: React.PropTypes.number,
};

DnR.defaultProps = {
	minWidth: 20,
	minHeight: 20,
	edgeDetectionRange: 5,
	initialWidth: null,
	initialHeight: null,
};