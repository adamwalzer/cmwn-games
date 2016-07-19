import Score from 'shared/components/score/0.1';

const up = 'up';
const down = 'down';
const score = 'score';

class ScoreScreenComponent extends skoash.Screen {
  constructor() {
    super();

    this.count = 0;

    this.up = this.up.bind(this);
    this.down = this.down.bind(this);
  }

  up() {
    var increment;
    if (++this.count % 3 === 0) increment = 30;
    this.refs[score].up(increment);
  }

  down() {
    this.refs[score].down();
  }

  renderContent() {
    return (
      <div>
        {this.renderContentList()}
        <button onClick={this.up}>{up}</button>
        <button onClick={this.down}>{down}</button>
      </div>
    );
  }
}

var ScoreScreen = (
  <ScoreScreenComponent
    id="score"
  >
    <Score
      ref="score"
      max={100}
      increment={20}
      downIncrement={10}
    />
  </ScoreScreenComponent>
);

export default ScoreScreen;
