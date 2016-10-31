import classNames from 'classnames';

class Draggable extends skoash.Component {
  constructor() {
    super();

    this.state = {
      endX: 0,
      endY: 0,
      zoom: 1,
    };

    this.mouseDown = this.mouseDown.bind(this);
    this.mouseUp = this.mouseUp.bind(this);

    this.moveEvent = this.moveEvent.bind(this);

    this.touchStart = this.touchStart.bind(this);
    this.touchEnd = this.touchEnd.bind(this);

    this.setZoom = this.setZoom.bind(this);
  }

  shouldDrag() {
    return this.props.shouldDrag.call(this);
  }

  markCorrect() {
    this.setState({
      correct: true,
    });
  }

  markIncorrect() {
    this.setState({
      correct: false,
    });

    if (this.props.returnOnIncorrect) {
      this.returnToStart();
    }
  }

  startEvent(e, cb) {
    var rect, startX, startY, endX, endY, grabX, grabY;

    if (e.target !== this.DOMNode) return;
    if (!this.shouldDrag()) return;

    if (e.targetTouches && e.targetTouches[0]) {
      rect = e.target.getBoundingClientRect();
      e = e.targetTouches[0];
      e.offsetX = e.pageX - rect.left;
      e.offsetY = e.pageY - rect.top;
    }

    grabX = e.offsetX / this.state.zoom;
    grabY = e.offsetY / this.state.zoom;

    startX = endX = (e.pageX / this.state.zoom - grabX);
    startY = endY = (e.pageY / this.state.zoom - grabY);

    if (!this.props.return && !this.props.returnOnIncorrect) {
      startX = _.isFinite(this.state.grabX) ?
        this.state.startX + this.state.grabX - grabX :
        startX;
      startY = _.isFinite(this.state.grabY) ?
        this.state.startY + this.state.grabY - grabY :
        startY;
    }

    this.setState({
      dragging: true,
      return: false,
      startX,
      startY,
      grabX,
      grabY,
      endX,
      endY,
    });

    this.updateGameState({
      path: this.props.draggableTarget,
      data: {
        dragging: this,
        dropped: null
      },
    });

    this.props.onDrag.call(this, this);

    if (typeof cb === 'function') cb.call(this);
  }

  attachMouseEvents() {
    window.addEventListener('mousemove', this.moveEvent);
    window.addEventListener('mouseup', this.mouseUp);
  }

  attachTouchEvents() {
    window.addEventListener('touchmove', this.moveEvent);
    window.addEventListener('touchend', this.touchEnd);
  }

  mouseDown(e) {
    this.startEvent(e, this.attachMouseEvents);
  }

  touchStart(e) {
    this.startEvent(e, this.attachTouchEvents);
  }

  moveEvent(e) {
    e = e.targetTouches && e.targetTouches[0] ? e.targetTouches[0] : e;

    this.setState({
      endX: (e.pageX / this.state.zoom - this.state.grabX),
      endY: (e.pageY / this.state.zoom - this.state.grabY),
    });
  }

  endEvent(cb) {
    this.onDrop();

    if (this.props.return) {
      this.returnToStart();
    } else {
      this.setState({
        dragging: false,
      });
    }

    if (typeof cb === 'function') cb.call(this);
  }

  setEnd(endX, endY) {
    this.setState({
      endX,
      endY
    });
  }

  returnToStart() {
    var endX, endY;

    if (this.props.stayOnCorrect && this.state.correct) {
      endX = this.state.endX;
      endY = this.state.endY;
    } else {
      endX = this.state.startX;
      endY = this.state.startY;
    }

    this.setState({
      dragging: false,
      return: true,
      endX,
      endY,
    });
  }

  detachMouseEvents() {
    window.removeEventListener('mousemove', this.moveEvent);
    window.removeEventListener('mouseup', this.mouseUp);
  }

  detachTouchEvents() {
    window.removeEventListener('touchmove', this.moveEvent);
    window.removeEventListener('touchend', this.touchEnd);
  }

  mouseUp() {
    this.endEvent(this.detachMouseEvents);
  }

  touchEnd() {
    this.endEvent(this.detachTouchEvents);
  }

  onDrop() {
    this.updateGameState({
      path: this.props.draggableTarget,
      data: {
        dragging: null,
        dropped: this
      },
    });

    this.props.onDrop.call(this, this);
  }

  bootstrap() {
    super.bootstrap();

    this.setZoom();

    this.DOMNode = ReactDOM.findDOMNode(this);

    this.DOMNode.addEventListener('mousedown', this.mouseDown);
    this.DOMNode.addEventListener('touchstart', this.touchStart);

    window.addEventListener('resize', this.setZoom);
  }

  setZoom() {
    skoash.trigger('getState').then(state => {
      this.setState({
        zoom: state.scale,
      });
    });
  }

  getStyle() {
    var x, y, transform;

    x = this.state.endX - this.state.startX;
    y = this.state.endY - this.state.startY;
    transform = `translateX(${x}px) translateY(${y}px)`;

    return {
      transform,
      WebkitTransform: transform,
    };
  }

  getClassNames() {
    return classNames({
      DRAGGING: this.state.dragging,
      RETURN: this.state.return,
      CORRECT: this.state.correct,
    }, 'draggable', this.state.classes, super.getClassNames());
  }

  render() {
    return (
      <div
        className={this.getClassNames()}
        data-message={this.props.message}
        style={this.getStyle()}
        children={this.props.children}
      />
    );
  }
}

Draggable.defaultProps = _.defaults({
  draggableTarget: 'draggable',
  shouldDrag: () => true,
  return: false,
  returnOnIncorrect: false,
  stayOnCorrect: true,
  onDrop: _.noop,
  onDrag: _.noop,
}, skoash.Component.defaultProps);

export default Draggable;
