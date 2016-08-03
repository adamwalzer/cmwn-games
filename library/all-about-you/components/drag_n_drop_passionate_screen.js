import DragNDropScreen from 'shared/components/drag_n_drop_screen/0.1';
import DropzoneComponent from 'shared/components/dropzone_component/0.1';

function collectData() {
  var data = {};
  if (!this.refs.dropzone || !this.refs.dropzone.refs.dropzone) return data;
  _.forIn(this.refs.dropzone.refs.dropzone.refs, (ref, key) => {
    if (key.indexOf('dropzone-') === -1) return;
    if (!ref.state.content) return;
    data[key] = ref.state.content.props.message;
  });
  return data;
}

function loadData() {

}

var DragNDropPassionateScreen = (
  <DragNDropScreen
    id="drag-n-drop-passionate"
    dropzoneAssets={[
      <skoash.Audio ref="drag" type="sfx" src="media/assets/_audio/_Buttons/S_BU_2.mp3" />,
      <skoash.Audio ref="correct" type="sfx" src="media/assets/_audio/_Buttons/S_BU_3.mp3" />
    ]}
    collectData={collectData}
    centerOnCorrect={true}
    dropzones={[
      <DropzoneComponent className="dropzone-list-item animated" />,
      <DropzoneComponent className="dropzone-list-item animated" />,
      <DropzoneComponent className="dropzone-list-item animated" />,
      <DropzoneComponent className="dropzone-list-item animated" />,
      <DropzoneComponent className="dropzone-list-item animated" />,
      <DropzoneComponent className="dropzone-list-item animated" />,
      <DropzoneComponent className="dropzone-list-item animated" />,
      <DropzoneComponent className="dropzone-list-item animated" />
    ]}
    dropzoneList={[
      <skoash.ListItem className="draggable-list-item friends animated" message="friends" />,
      <skoash.ListItem className="draggable-list-item world-peace animated" message="world-peace" />,
      <skoash.ListItem className="draggable-list-item sports animated" message="sports" />,
      <skoash.ListItem className="draggable-list-item playing-games animated" message="playing-games" />,
      <skoash.ListItem className="draggable-list-item looking-cool animated" message="looking-cool" />,
      <skoash.ListItem className="draggable-list-item school animated" message="school" />,
      <skoash.ListItem className="draggable-list-item celebrities animated" message="celebrities" />,
      <skoash.ListItem className="draggable-list-item environment animated" message="environment"  />
    ]}
    revealAssets={[
      <skoash.Audio ref="friends" type="voiceOver" src="media/assets/_audio/VOs/VO_Friends.mp3" />,
      <skoash.Audio ref="world-peace" type="voiceOver" src="media/assets/_audio/VOs/VO_WorldP.mp3" />,
      <skoash.Audio ref="sports" type="voiceOver" src="media/assets/_audio/VOs/VO_Sports.mp3" />,
      <skoash.Audio ref="playing-games" type="voiceOver" src="media/assets/_audio/VOs/VO_Playing.mp3" />,
      <skoash.Audio ref="looking-cool" type="voiceOver" src="media/assets/_audio/VOs/VO_Looking.mp3" />,
      <skoash.Audio ref="school" type="voiceOver" src="media/assets/_audio/VOs/VO_School.mp3" />,
      <skoash.Audio ref="celebrities" type="voiceOver" src="media/assets/_audio/VOs/VO_Celebrities.mp3" />,
      <skoash.Audio ref="environment" type="voiceOver" src="media/assets/_audio/VOs/VO_Environment.mp3" />
    ]}
    afterDropzoneList={[
      <div ref="meter" className="meter animated"></div>
    ]}
  >
    <skoash.Audio ref="vo" type="voiceOver" src="media/assets/_audio/VOs/VO_Passionate.mp3" />
    <skoash.Image ref="penguin" className="penguin animated" src="media/assets/_images/S_3/img_s3_penguin-01.png" />
    <skoash.Image ref="banner" className="banner animated" src="media/assets/_images/S_3/text_what_are_you_passionate_about%20copy.png" />
    <div ref="frame" className="frame animated"></div>
  </DragNDropScreen>
);

export default DragNDropPassionateScreen;

// screen should only complete once all items are in a dropzones
// collect the data from dropzone
