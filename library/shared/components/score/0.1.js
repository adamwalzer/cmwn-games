import classNames from 'classnames';
import _ from 'lodash';

class Score extends skoash.Component {
  constructor() {
    super();

    this.state = {
      score: 0
    };

    this.checkComplete = this.checkComplete.bind(this);
  }

  checkComplete() {
    if (!this.props.max) return;
    if (this.state.score >= this.props.max && !this.state.complete) {
      this.complete();

      setTimeout(() => {
        if (this.props.resetOnComplete) {
          this.setState({
            score: 0
          });
        }

        this.updateGameState({
          path: this.props.correctTarget,
          data: {
            complete: true
          }
        });
      }, this.props.completeDelay);

    } else if (this.state.complete) {
      this.incomplete();
    }
  }

  up(increment) {
    increment = _.isFinite(increment) ? increment :
      _.isFinite(this.props.increment) ? this.props.increment : 1;

    if (!_.isFinite(increment)) throw 'increment must be finite';

    this.setState({
      score: this.state.score + increment
    }, this.checkComplete);
  }

  down(increment) {
    increment = _.isFinite(increment) ? increment :
      _.isFinite(this.props.downIncrement) ? this.props.downIncrement :
      _.isFinite(this.props.increment) ? this.props.increment : 1;

    if (!_.isFinite(increment)) throw 'increment must be finite';

    this.setState({
      score: this.state.score - increment
    }, this.checkComplete);
  }

  componentWillReceiveProps(props) {
    if (props.correct != null && props.correct !== this.props.correct) {
      if (props.correct) {
        this.up();
      } else {
        this.down();
      }

      if (this.props.correctTarget) {
        this.updateGameState({
          path: this.props.correctTarget,
          data: {
            correct: null
          }
        });
      }
    }
  }

  getClassNames() {
    return classNames(
      'score',
      skoash.Component.prototype.getClassNames.call(this)
    );
  }

  render() {
    return (
      <div {...this.props} className={this.getClassNames()} data-max={this.props.max} data-score={this.state.score}>
        {this.props.leadingContent}
        <span>
          {this.state.score}
        </span>
        {this.props.children}
      </div>
    );
  }
}

export default Score;
