import SelectableReveal from 'shared/components/selectable_reveal/0.1';

var collectData = function() {
  var data = {};
  if (!this.refs || !this.refs['selectable-reveal'] || !this.refs['selectable-reveal'].refs || !this.refs['selectable-reveal'].refs.selectable) return data;
  _.forIn(this.refs['selectable-reveal'].refs.selectable.refs , (ref, key) => {
    if (ref.props.className.indexOf('SELECTED') === -1) return;
    data[this.props.id] = ref.props['data-ref'];
  });
  return data;
}

var PickOnePowerfulScreen = (
  <skoash.Screen
    id="pick-one-powerful"
    collectData={collectData}
  >
    <skoash.Audio ref="vo" type="voiceOver" src="media/assets/_audio/VOs/VO_Powerful.mp3" />
    <skoash.Image ref="banner" className="banner animated" src="media/assets/_images/S_5/img-05-text-top-01.png" />

    <SelectableReveal
      ref="selectable-reveal"
      selectableCompleteOnSelect
      selectableCheckComplete={false}
      revealCompleteOnOpen
      revealCheckComplete={false}
      allCorrect
      assets={[
        <skoash.Audio ref="correct" type="sfx" src="media/assets/_audio/_Buttons/S_BU_1.mp3" />
      ]}
      selectableList={[
        <skoash.ListItem className="very-powerful animated" data-ref="very-powerful" correct />,
        <skoash.ListItem className="not-powerful animated" data-ref="not-powerful" correct />,
        <skoash.ListItem className="unsure animated" data-ref="unsure" correct />,
        <skoash.ListItem className="dont-care animated" data-ref="dont-care" correct />
      ]}
      revealAssets={[
        <skoash.Audio ref="very-powerful" type="voiceOver" src="media/assets/_audio/VOs/VO_Very.mp3" delay={1000} />,
        <skoash.Audio ref="not-powerful" type="voiceOver" src="media/assets/_audio/VOs/VO_DontFeel.mp3" delay={1000} />,
        <skoash.Audio ref="unsure" type="voiceOver" src="media/assets/_audio/VOs/VO_Unsure.mp3" delay={1000} />,
        <skoash.Audio ref="dont-care" type="voiceOver" src="media/assets/_audio/VOs/VO_DontCare.mp3" delay={1000} />
      ]}
    />

    <div ref="meter" className="meter animated"></div>
  </skoash.Screen>
);

export default PickOnePowerfulScreen;

// edit highlighted state
// save data
