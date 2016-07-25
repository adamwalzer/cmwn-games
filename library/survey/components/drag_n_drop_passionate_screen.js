import classNames from 'classnames';
import DropzoneReveal from 'shared/components/dropzone_reveal/0.1';


class DropzoneComponent extends skoash.Component {
  getClassNames() {
    return classNames(
      this.state.content,
      skoash.Component.prototype.getClassNames.call(this)
    );
  }
}

class WhatMostPassionateScreenComponent extends skoash.Screen {
  constructor() {
    super();
    this.correctRespond = this.correctRespond.bind(this)
  }

  correctRespond(message, dropzoneKey) {
    var dropzone = this.refs.dropzone.refs.dropzone.refs[`dropzone-${dropzoneKey}`];
    dropzone.setState({
      content: message
    });
    console.log(dropzone);
  }

  renderContent() {
    return (
      <div>
        {this.renderContentList()}
        <DropzoneReveal
          ref="dropzone"
          dropzoneMessage="friends"
          correctRespond={this.correctRespond}
          dropzones={[
            <DropzoneComponent className="dropzone-list-item animated" />,
            <DropzoneComponent className="dropzone-list-item animated" />,
            <DropzoneComponent className="dropzone-list-item animated" />,
            <DropzoneComponent className="dropzone-list-item animated" />,
            <DropzoneComponent className="dropzone-list-item lanimated" />,
            <DropzoneComponent className="dropzone-list-item animated" />,
            <DropzoneComponent className="dropzone-list-item animated" />,
            <DropzoneComponent className="dropzone-list-item animated" />
          ]}
          dropzoneList={[
            <skoash.ListItem className="draggable-list-item friends animated" message="friends" return />,
            <skoash.ListItem className="draggable-list-item world-peace animated" message="world-peace" return />,
            <skoash.ListItem className="draggable-list-item sports animated" message="sports" return />,
            <skoash.ListItem className="draggable-list-item playing-games animated" message="playing-games" return />,
            <skoash.ListItem className="draggable-list-item looking-cool animated" message="looking-cool" return />,
            <skoash.ListItem className="draggable-list-item school animated" message="school" return />,
            <skoash.ListItem className="draggable-list-item celebrities animated" message="celebrities" return />,
            <skoash.ListItem className="draggable-list-item environment animated" message="environment" return />
          ]}
          revealAssets={[
            <skoash.Audio ref="drag" type="sfx" src="media/assets/_audio/_Buttons/S_BU_2.mp3" />,
            <skoash.Audio ref="friends" type="voiceOver" src="media/assets/_audio/VOs/VO_Friends.mp3" />,
            <skoash.Audio ref="world-peace" type="voiceOver" src="media/assets/_audio/VOs/VO_WorldP.mp3" />,
            <skoash.Audio ref="sports" type="voiceOver" src="media/assets/_audio/VOs/VO_Sports.mp3" />,
            <skoash.Audio ref="playing-games" type="voiceOver" src="media/assets/_audio/VOs/VO_Playing.mp3" />,
            <skoash.Audio ref="looking-cool" type="voiceOver" src="media/assets/_audio/VOs/VO_Looking.mp3" />,
            <skoash.Audio ref="school" type="voiceOver" src="media/assets/_audio/VOs/VO_School.mp3" />,
            <skoash.Audio ref="celebrities" type="voiceOver" src="media/assets/_audio/VOs/VO_Celebrities.mp3" />,
            <skoash.Audio ref="environment" type="voiceOver" src="media/assets/_audio/VOs/VO_Environment.mp3" />
          ]}
        />
        <div ref="meter" className="meter animated"></div>
      </div>
    );
  }
}

var WhatMostPassionateScreen = (
  <WhatMostPassionateScreenComponent
    id="what-most-passionate"
  >
    <skoash.Audio ref="vo" type="voiceOver" src="media/assets/_audio/VOs/VO_Passionate.mp3" />
    <skoash.Image ref="penguin" className="penguin animated" src="media/assets/_images/S_3/img_s3_penguin-01.png" />
    <skoash.Image ref="banner" className="banner animated" src="media/assets/_images/S_3/text_what_are_you_passionate_about%20copy.png" />
    <div ref="frame" className="frame animated"></div>
  </WhatMostPassionateScreenComponent>
);

export default WhatMostPassionateScreen;

// (consider dropzone reveal in order to play vo's)
// add drop zones
// add drag/drop sounds
// update the component to play the audio when list item is selected/dropped
// list items need to reset if another item is put in same dropzone
// screen should only complete once all items are in a dropzones
// collect the data from dropzone
// resize icons to better fit frame