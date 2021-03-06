import CatchGameScreenComponent from './catch_game_screen_component';

export default function (props, ref, key) {
    return CatchGameScreenComponent(props, ref, key, {
        id: 'catch-game-level-one',
        level: 1,
        rows: 3,
        timeout: 120000,
        prepTimeout: 1000,
        openOnStart: 'instructions',
        bin: [
            {
                className: 'mushroom',
                message: ''
            },
            {
                className: 'banana',
                message: 'trash'
            },
            {
                className: 'paper',
                message: 'trash'
            },
            {
                className: 'dog',
                message: ''
            },
            {
                className: 'battery',
                message: 'trash'
            },
            {
                className: 'duck',
                message: ''
            },
            {
                className: 'squirrel',
                message: ''
            },
            {
                className: 'tire',
                message: 'trash'
            },
            {
                className: 'blue-flower',
                message: ''
            },
            {
                className: 'yellow-flower',
                message: ''
            },
            {
                className: 'red-flower',
                message: ''
            },
            {
                className: 'purple-flower',
                message: ''
            },
            {
                className: 'glass',
                message: 'trash'
            },
            {
                className: 'plastic',
                message: 'trash'
            },
        ],
        vos: [
            <skoash.MediaSequence
                ref="instructions"
                silentOnStart
            >
                <skoash.Audio
                    type="voiceOver"
                    src={'media/_assets/_sounds/_vos/Instructions.mp3'}
                />
                <skoash.Audio
                    type="voiceOver"
                    src={'media/_assets/_sounds/_vos/PickUpLitter.mp3'}
                />
            </skoash.MediaSequence>,
            <skoash.MediaSequence
                ref="level-up"
                silentOnStart
            >
                <skoash.Audio
                    type="voiceOver"
                    src={'media/_assets/_sounds/_effects/LevelUp.mp3'}
                />
                <skoash.Audio
                    type="voiceOver"
                    src={'media/_assets/_sounds/_vos/Congratulations.mp3'}
                />
            </skoash.MediaSequence>,
            <skoash.MediaSequence
                ref="try-again"
                silentOnStart
            >
                <skoash.Audio
                    type="voiceOver"
                    complete
                    src={'media/_assets/_sounds/_effects/TryAgain.mp3'}
                />
                <skoash.Audio
                    type="voiceOver"
                    complete
                    src={'media/_assets/_sounds/_vos/TryAgain.mp3'}
                />
                <skoash.Audio
                    type="voiceOver"
                    complete
                    src={'media/_assets/_sounds/_vos/YouDidntWin.mp3'}
                />
            </skoash.MediaSequence>,
        ],
        sfx: [
            <skoash.Audio
                type="sfx"
                ref="miss"
                src={'media/_assets/_sounds/_effects/LosePoints.mp3'}
                complete
            />,
        ],
        revealList: [
            <skoash.Component
                ref="instructions"
                className="instructions"
                type="li"
            >
                <div>
                    <div className="instructions" />
                    <div className="words" />
                    <button
                        onClick={function () {
                            skoash.trigger('updateState', {
                                path: 'reveal',
                                data: {
                                    close: true,
                                }
                            });
                        }}
                    />
                </div>
            </skoash.Component>,
            <skoash.Component
                ref="level-up"
                className="level-up"
                type="li"
            >
                <div>
                  <div className="congratulations" />
                  <div className="level-up" />
                </div>
            </skoash.Component>,
            <skoash.Component
                ref="try-again"
                className="try-again"
                type="li"
            >
                <div>
                    <div className="try-again" />
                    <div className="words" />
                    <button
                      onClick={function () {
                          skoash.trigger('updateState', {
                              path: 'reveal',
                              data: {
                                  close: true,
                              }
                          });
                      }}
                    />
                </div>
            </skoash.Component>,
        ]
    });
}
