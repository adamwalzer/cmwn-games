export default function (props, ref, key) {
    // TODO get correct copy and/or audio for "cooler" reveal

    const WAYS = [
        'dishes',
        'teeth',
        'plants',
        'clothes',
        'lukewarm',
        'cooler',
        'trash',
        'car',
    ];

    var openReveal = function () {
        var index = _.get(props, 'data.reveal.index', -1);
        if (!_.isFinite(index) || index > 7) index = -1;
        this.updateScreenData({
            path: 'reveal',
            data: {
                index: index + 1
            }
        });
    };

    var closeReveal = function () {
        this.updateScreenData({
            path: 'reveal',
            data: {
                close: true
            },
        });

        updateMeterHeight.call(this);
    };

    var updateMeterHeight = function () {
        var complete = false;
        var height = _.get(props, 'data.meter.height', 0);

        if (!_.isFinite(height) || height >= 7) {
            height = 7;
            complete = true;
        }

        this.updateScreenData({
            path: 'meter',
            data: {
                height: height + 1,
                complete,
            },
        });

    };

    var capitalize = function (w) {
        return w.charAt(0).toUpperCase() + w.slice(1);
    };

    return (
        <skoash.Screen
            {...props}
            ref={ref}
            key={key}
            id="conserve"
            className={_.get(props, 'data.selectable.target') ? 'SELECTING' : null}
        >
            <skoash.Image src={`${MEDIA.IMAGE}img_15.1.png`} />
            <skoash.Image className="hidden" src={`${MEDIA.IMAGE}FR_4.png`} />
            <skoash.Image className="hidden" src={`${MEDIA.SPRITE}img_sp_15.1.png`} />
            <skoash.Image className="hidden" src={`${MEDIA.SPRITE}img_15.3.png`} />
            <div
                id="door-sprite"
                className={
                    (_.get(props, 'data.reveal.open.length', -1) > 0) ? 'open' : ''
                }
            />
            <skoash.Component id="meter-sprite">
                {[...Array(WAYS.length + 1)].map((value, index) => {
                    return (
                        <skoash.Component
                            className={_.get(props, 'data.meter.height', -1) === index ? 'visible' : ''}
                            key={index}
                        />
                    );
                })}
            </skoash.Component>
            <skoash.MediaCollection
                play={_.get(props, 'data.meter.complete', false) ? 'meter-complete' : ''}
            >
                <skoash.Audio
                    type="sfx"
                    data-ref="meter-complete"
                    src={`${MEDIA.EFFECT}Harmonica.mp3`}
                />
            </skoash.MediaCollection>
            <skoash.Audio type="voiceOver" src={`${MEDIA.VO}WaysConserve.mp3`} />
            <skoash.Selectable
                ref="selectable"
                list={[
                    <li
                        id="door"
                        className={
                            (_.get(props, 'data.reveal.open.length', -1) > 0) ? 'open' : ''
                        }
                    />
                ]}
                dataTarget="selectable"
                onSelect={openReveal}
            />
            <skoash.MediaCollection
                play={WAYS[_.get(props, 'data.reveal.index', null)] + ' ' + _}
            >
                <skoash.Audio
                    onComplete={closeReveal}
                    type="voiceOver"
                    data-ref={WAYS[0]}
                    src={`${MEDIA.VO}Ways${capitalize(WAYS[0])}.mp3`}
                />
                <skoash.Audio
                    onComplete={closeReveal}
                    type="voiceOver"
                    data-ref={WAYS[1]}
                    src={`${MEDIA.VO}Ways${capitalize(WAYS[1])}.mp3`}
                />
                <skoash.Audio
                    onComplete={closeReveal}
                    type="voiceOver"
                    data-ref={WAYS[2]}
                    src={`${MEDIA.VO}Ways${capitalize(WAYS[2])}.mp3`}
                />
                <skoash.Audio
                    onComplete={closeReveal}
                    type="voiceOver"
                    data-ref={WAYS[3]}
                    src={`${MEDIA.VO}Ways${capitalize(WAYS[3])}.mp3`}
                />
                <skoash.Audio
                    onComplete={closeReveal}
                    type="voiceOver"
                    data-ref={WAYS[4]}
                    src={`${MEDIA.VO}Ways${capitalize(WAYS[4])}.mp3`}
                />
                <skoash.Audio
                    onComplete={closeReveal}
                    type="voiceOver"
                    data-ref={WAYS[5]}
                    src={`${MEDIA.VO}Ways${capitalize(WAYS[5])}.mp3`}
                />
                <skoash.Audio
                    onComplete={closeReveal}
                    type="voiceOver"
                    data-ref={WAYS[6]}
                    src={`${MEDIA.VO}Ways${capitalize(WAYS[6])}.mp3`}
                />
                <skoash.Audio
                    onComplete={closeReveal}
                    type="voiceOver"
                    data-ref={WAYS[7]}
                    src={`${MEDIA.VO}Ways${capitalize(WAYS[7])}.mp3`}
                />
            </skoash.MediaCollection>
            <skoash.Component ref="frame" className="frame animated">
                <skoash.Reveal
                    ref="reveal"
                    openTarget="reveal"
                    openReveal={WAYS[_.get(props, 'data.reveal.index', null)]}
                    closeReveal={_.get(props, 'data.reveal.close')}
                    list={[
                        <skoash.ListItem data-ref={WAYS[0]}>
                            <p>
                                Don't let the water<br />
                                run while<br />
                                washing dishes.
                            </p>
                        </skoash.ListItem>,
                        <skoash.ListItem data-ref={WAYS[1]}>
                            <p>
                                Don't let the water<br />
                                run continuously while<br />
                                brushing your teeth.
                            </p>
                        </skoash.ListItem>,
                        <skoash.ListItem data-ref={WAYS[2]}>
                            <p>
                                Use leftover water from<br />
                                the melted ice in your<br />
                                glass to water plants.
                            </p>
                        </skoash.ListItem>,
                        <skoash.ListItem data-ref={WAYS[3]}>
                            <p>
                                Only wash full loads<br />
                                of clothes.
                            </p>
                        </skoash.ListItem>,
                        <skoash.ListItem data-ref={WAYS[4]}>
                            <p>
                                Use lukewarm water.<br /><br />
                                Don't let it<br />
                                run to warm up.
                            </p>
                        </skoash.ListItem>,
                        <skoash.ListItem data-ref={WAYS[5]}>
                            <p>
                                Collect cooler water<br />
                                in a bucket for plants<br />
                                or cleaning or flushing.
                            </p>
                        </skoash.ListItem>,
                        <skoash.ListItem data-ref={WAYS[6]}>
                            <p>
                                Throw trash in<br />
                                a waste basket.<br /><br />
                            Don't flush it.
                            </p>
                        </skoash.ListItem>,
                        <skoash.ListItem data-ref={WAYS[7]}>
                            <p>
                                Wash the car in the grass<br />
                                instead of the driveway.
                            </p>
                        </skoash.ListItem>,
                    ]}
                    assets={[
                        <skoash.Audio
                            data-ref="open-sound"
                            type="sfx"
                            src={`${MEDIA.EFFECT}RevealOpen.mp3`}
                        />,
                        <skoash.Audio
                            data-ref="close-sound"
                            type="sfx"
                            src={`${MEDIA.EFFECT}RevealClosed.mp3`}
                            delay={500}
                        />
                    ]}
                />
            </skoash.Component>
        </skoash.Screen>
    );
}
