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
		this.canResize = false;
		this.state = {
			canDrag: false,
			hitEdges: {
				top: false,
				bottom: false,
				left: false,
				right: false
			}
		};
	}
	componentDidMount() {
		// pane.addEventListener('mousedown', onMouseDown);
		// window.addEventListener('mousemove', onMove);
		// window.addEventListener('mouseup', onUp);

		// Touch events	
		// pane.addEventListener('touchstart', onTouchDown);
		// window.addEventListener('touchmove', onTouchMove);
		// window.addEventListener('touchend', onTouchEnd);
	}
	componentDidUpdate() {
	}
	componentWillUnmount() {
	}
	render() {
		const {
      style,
      titleStyle,
      shadowPaneStyle,
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

		return (
			<div ref="pane"
				onMouseDownCapture={this._onDown.bind(this)}
				onMouseMoveCapture={this._cursorStatus.bind(this)}
				onMouseUpCapture={()=>console.log('mouseup')}
				style={{...defaultStyles.pane, cursor:cursor, ...style}}>
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
			console.log(`top:${hitTop} bot:${hitBottom} left:${hitLeft} right:${hitRight}`);
		}

		if (hitTop || hitBottom || hitLeft || hitRight){
			this.canResize = true;
			this.canDrag = false;
			e.stopPropagation();
		}
		else {
			this.canResize = false;
			const titleBounding = this.refs.title.getBoundingClientRect();
			if (this.cursorX > titleBounding.left && this.cursorX < titleBounding.right &&
					this.cursorY > titleBounding.top && this.cursorY < titleBounding.bottom) {
				if(this.state.canDrag === false)
					this.setState({canDrag:true});
			}
			else if (this.state.canDrag === true) {
				this.setState({canDrag:false});
			}
		}
	}
	_onDown(e){
		this._cursorStatus(e);
		this.clicked = {x: e.clientX, y: e.clientY};
	}
	_onUp(e){
		this._cursorStatus(e);
		this.clicked = null;
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
};

DnR.defaultProps = {
	minWidth: 20,
	minHeight: 20,
	edgeDetectionRange: 5,
};