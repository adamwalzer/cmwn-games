import classNames from 'classnames';

class Timer extends skoash.Component {
  constructor() {
    super();

    this.state = {
      time: 0,
      stamp: 0
    };

    this.checkComplete = this.checkComplete.bind(this);
  }

  checkComplete() {
    var time = Date.now();

    if (!this.props.checkComplete) return window.requestAnimationFrame(this.checkComplete);

    if (!this.state.started || this.state.paused) return;

    if (time >= this.state.stamp) {
      this.setState({
        stamp: time + 1000,
        time: this.state.time + 1
      }, () => {
        if (this.state.time * 1000 >= this.props.timeout) {
          this.complete();
          this.stop();
        } else {
          window.requestAnimationFrame(this.checkComplete);
        }
      });
    } else {
      window.requestAnimationFrame(this.checkComplete);
    }
  }

  incompleteRefs() {
    this.restart();
  }

  restart() {
    if (this.state.complete) this.incomplete();

    this.setState({
      time: 0,
      stamp: 0,
    }, () => {
      this.start();
    });
  }

  stop() {
    this.setState({
      started: false
    });
  }

  pause() {
    if (this.state.started) {
      this.setState({
        paused: true
      });
    }
  }

  resume() {
    if (this.state.paused) {
      this.setState({
        paused: false
      }, () => {
        this.start();
      });
    }
  }

  componentWillReceiveProps(props) {
    super.componentWillReceiveProps(props);

    if (props.restart && props.restart !== this.props.restart) {
      this.restart();
    }
  }

  getClassNames() {
    return classNames(
      'timer',
      skoash.Component.prototype.getClassNames.call(this)
    );
  }

  render() {
    var time = this.props.getTime.call(this);
    return (
      <div {...this.props} className={this.getClassNames()} time={time}>
        {this.props.leadingContent}
        <span>
          {time}
        </span>
        {this.props.children}
      </div>
    );
  }
}

Timer.defaultProps = _.defaults({
  getTime: function () {
    return this.props.countDown ? this.props.timeout / 1000 - this.state.time : this.state.time;
  },
  leadingContent: '',
  timeout: 60000,
  countDown: false,
}, skoash.Component.defaultProps);

export default Timer;
