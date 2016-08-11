import ClassNames from 'classnames';

import SelectableAudio from 'shared/components/selectable_audio/0.1';
import Reveal from 'shared/components/reveal/0.1';
import AudioSequence from 'shared/components/audio_sequence/0.1';
import Timer from 'shared/components/timer/0.1';

const GOOD_JOB = '0';
const TRY_AGAIN = '1';

class TrashScreenComponent extends skoash.Screen {
  constructor() {
    super();
   
    this.state = {
      cursorLeft: 0,
      cursorTop: 0,
      touchstart: false,
      revealOpen: false,
    }
  }

  bootstrap() {
    super.bootstrap();

    if (this.refs.center && this.refs.center.refs &&
      this.refs.center.refs.group && this.refs.center.refs.group.refs) {
      Object.keys(this.refs.center.refs.group.refs).forEach(ref => {
        this.refs[ref] = this.refs.center.refs.group.refs[ref];
      });
    }
 
    window.addEventListener('mousemove', this.moveCursor.bind(this));
    window.addEventListener('touchstart', this.touchstart.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('mousemove', this.moveCursor);
    window.removeEventListener('touchstart', this.touchstart);
  }

  moveCursor(e) {
    var zoom = skoash.trigger('getState').scale;
    this.setState({
      cursorLeft: e.clientX / zoom - 50,
      cursorTop: e.clientY / zoom - 65,
    });
  }

  touchstart() {
    this.setState({
      touchstart: true
    });
  }

  onSelectableAudioComplete() {
    this.refs.reveal.open(GOOD_JOB);

    this.setState({ revealOpen: true }, () => {
      this.refs.timer.complete();
      this.refs.timer.stop();
    });

  }

  onTimerComplete() {
    if (!this.state.revealOpen) {
      this.refs.reveal.open(TRY_AGAIN);
      this.setState({ revealOpen: true });
    }
  }

  closeRespond(ref) {
    this.setState({ revealOpen: false });
    if (ref === TRY_AGAIN) {
      this.refs.timer.restart();
    }
  }

  getClassNames() {
    var classNames = '';
    if (this.state.revealOpen)
      classNames += 'REVEAL-OPEN ';
    if (this.state.touchstart)
      classNames += 'TOUCH ';
    return classNames + super.getClassNames();
  }

  renderSelectableAudio() {
    return (
      <SelectableAudio
        ref="selectable-audio"
        selectClass="HIGHLIGHTED"
        onComplete={this.onSelectableAudioComplete.bind(this)}
        selectableList={[
          <skoash.ListItem data-ref="correct" correct id="bottle" />,
          <skoash.ListItem data-ref="correct" correct id="cans" />,
          <skoash.ListItem data-ref="correct" correct id="cleaner" />,
          <skoash.ListItem data-ref="correct" correct id="wash" />,
          <skoash.ListItem data-ref="correct" correct id="necklace" />,
          <skoash.ListItem data-ref="correct" correct id="oil" />,
          <skoash.ListItem data-ref="correct" correct id="bag" />,
          <skoash.ListItem data-ref="correct" correct id="water" />,
          <skoash.ListItem data-ref="correct" correct id="shoes" />,
          <skoash.ListItem data-ref="correct" correct id="soap" />,
          <skoash.ListItem data-ref="correct" correct id="sauce" />,
          <skoash.ListItem data-ref="correct" correct id="beeker" />,
          <skoash.ListItem data-ref="correct" correct id="drum" />,
          <skoash.ListItem data-ref="correct" correct id="cosmetics" />,
          <skoash.ListItem data-ref="correct" correct id="tire" />,
          <skoash.ListItem data-ref="correct" correct id="floss" />,
          <skoash.ListItem data-ref="correct" correct id="ketchup" />,
          <skoash.ListItem data-ref="correct" correct id="bulb" />,
          <skoash.ListItem data-ref="correct" correct id="fries" />,
          <skoash.ListItem data-ref="correct" correct id="soda" />,
          <skoash.ListItem data-ref="incorrect" id="coral" />,
          <skoash.ListItem data-ref="incorrect" id="crab" />,
          <skoash.ListItem data-ref="incorrect" id="turtle" />,
          <skoash.ListItem data-ref="incorrect" id="shell" />,
          <skoash.ListItem data-ref="incorrect" id="fish1" />,
          <skoash.ListItem data-ref="incorrect" id="fish2" />,
          <skoash.ListItem data-ref="incorrect" id="lobster" />,
          <skoash.ListItem data-ref="incorrect" id="shell2" />,
          <skoash.ListItem data-ref="incorrect" id="fish3" />,
          <skoash.ListItem data-ref="incorrect" id="starfish" />,
          <skoash.ListItem data-ref="incorrect" id="starfish" className="second" />,
          <skoash.ListItem data-ref="incorrect" id="octopus" />,
          <skoash.ListItem data-ref="incorrect" id="shell3" />,
          <skoash.ListItem data-ref="incorrect" id="seahorse" />,
          <skoash.ListItem data-ref="incorrect" id="fish4" />,
          <skoash.ListItem data-ref="incorrect" id="fish5" />,
          <skoash.ListItem data-ref="incorrect" id="jellyfish" />,
        ]}
        audioAssets={[
          <skoash.Audio data-ref="correct" type="sfx" src="media/_audio/_S_Trash/HFF_SX_Right.mp3" />,
          <skoash.Audio data-ref="incorrect" type="sfx" src="media/_audio/_S_Trash/HFF_SX_Wrong.mp3" complete />,
        ]}
      />
    );
  }

  renderReveal() {
    return (
      <Reveal
        ref="reveal"
        className="center"
        closeRespond={this.closeRespond.bind(this)}
        pl-bg
        list={[
          <skoash.Component id="goodJob" correct>
            <skoash.Image src="media/_images/_S_GoodJob/img_10.1.png" />
            <p>
              Take this offline.<br /> Never throw the trash in the water.
            </p>
          </skoash.Component>,
          <skoash.Component id="tryAgain">
            <skoash.Image src="media/_images/_S_GoodJob/img_10.2.png" />
            <p>
              You ran out of time!
            </p>
          </skoash.Component>,
        ]}
        assets={[
          <AudioSequence className="audio-sequence" playOnStart={false}>
            <skoash.Audio id="goodJob" type="voiceOver" src="media/_audio/_S_GoodJob/HFF_VO_GoodJob.mp3" />
            <skoash.Audio id="neverThrow" type="voiceOver" src="media/_audio/_S_GoodJob/HFF_VO_NeverThrow.mp3" />
          </AudioSequence>,
          <skoash.Audio id="tryAgain" type="voiceOver" src="media/_audio/_S_GoodJob/HFF_VO_TryAgain.mp3" />,
        ]}
        button={<button className="try-again" onClick={this.close.bind(this)} pl-bg></button>}
      />
    );
  }

  renderTimer() {
    return (
      <Timer
        ref="timer"
        countDown={true}
        timeout={3000}
        leadingContent={<skoash.Image src="media/_images/_S_Trash/img_9.1.png" />}
        onComplete={this.onTimerComplete.bind(this)}
      />
    );
  }

  renderNet() {
    return (
      <skoash.Image ref="net" className="net" src="media/_images/_S_Trash/img_9.3.png" 
        style={{
          left: this.state.cursorLeft,
          top: this.state.cursorTop,
        }}
      />
    );
  }

  renderContent() {
    return (
      <div>
        <skoash.Component ref="center" className="center">
          <skoash.Component ref="group" className="group">
            <skoash.Image className="hidden" src="media/_images/_S_Trash/img_9.2.png" />
            {this.renderNet()}
            {this.renderSelectableAudio()}
            {this.renderReveal()}
            {this.renderTimer()}
          </skoash.Component>
        </skoash.Component>
      </div>
    );
  }
}

var TrashScreen = (
  <TrashScreenComponent
    ref="trash"
    id="trash"
  >
  </TrashScreenComponent>
);

export default TrashScreen;
