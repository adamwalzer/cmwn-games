import SelectableScreen from 'shared/components/selectable_screen/0.1';

export default function (props, ref, key) {
    return (
        <SelectableScreen
            {...props}
            ref={ref}
            key={key}
            id="pig"
            answers={['saver']}
            selectableList={[
                <skoash.ListItem className="pig animated" data-ref="pig" />,
                <skoash.ListItem className="bulb animated" data-ref="saver" correct />
            ]}
        >
            <skoash.Audio ref="vo" type="voiceOver" src="media/S_4/VO_4.1.mp3" pl-delay={1000} />
            <skoash.Audio ref="saver" type="voiceOver" src="media/S_4/VO_4.2.mp3" />
            <skoash.Audio ref="pig" type="voiceOver" src="media/S_4/S_4.1.mp3" complete />
            <skoash.Audio ref="correct" type="sfx" src="media/S_4/S_4.2.mp3" />
            <skoash.Component ref="title" className="title animated" >
                <div>Who do you want to be?</div>
            </skoash.Component>
        </SelectableScreen>
    );
}
