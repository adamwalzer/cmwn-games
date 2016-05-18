/**
 * Index script
 * @module
 */
import config from './config.game';

// import '../../..//shared/js/screen-ios-splash';
// import './components/multiple-choice/behavior';
// import './components/reveal/behavior';
// import './components/screen-basic/behavior';
// import './components/screen-quit/behavior';
// import './components/selectable-reveal/behavior';
// import './components/selectable/behavior';
// import './components/title/behavior';
// import './components/video/behavior';

import Loader from '../shared/components/loader/0.1.js';

import iOSScreen from '../shared/components/ios_splash_screen/0.1.js';
import TitleScreen from './components/title_screen.js';
import BulbsScreen from './components/bulbs_screen.js';
import PigScreen from './components/pig_screen.js';
import SwitchesScreen from './components/switches_screen.js';
import InfoScreen from './components/info_screen.js';
import VideoScreen from './components/video_screen.js';
import FlipScreen from './components/flip_screen.js';

import QuitScreen from '../shared/components/quit_screen/0.1.js';

// import '../shared/js/test-platform-integration';

class BeBright extends play.Game {
  constructor() {
    super(config);

    this.screens = [
      iOSScreen,
      TitleScreen,
      BulbsScreen,
      PigScreen,
      SwitchesScreen,
      InfoScreen,
      VideoScreen,
      FlipScreen,
    ];

    this.menus = {
      quit: QuitScreen,
    };
  }

  componentWillMount() {
    play.Game.prototype.componentWillMount.call(this);


  }

  renderLoader() {
    return (
      <Loader />
    );
  }

  renderAssets() {
    return (
      <div>
        <play.Audio ref='bkg-1' type="background" src="media/_BKG/S_BKG_1.mp3" loop />
        <play.Audio ref="button" type="sfx" src="media/_Buttons/S_BU_1.mp3" />
        <play.Audio ref="screen-complete" type="sfx" src="media/_Buttons/S_BU_2.mp3" />
        <play.Audio ref="correct" type="sfx" src="media/_Buttons/S_BU_3.mp3" />
      </div>
    );
  }

}

play.start(BeBright,config.id);

import '../shared/js/google-analytics';
