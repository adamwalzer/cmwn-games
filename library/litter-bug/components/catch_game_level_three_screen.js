import CatchGameScreenComponent from './catch_game_screen_component';

export default function (props, ref, key) {
  return CatchGameScreenComponent(props, ref, key, {
    id: 'catch-game-level-three',
    level: 3,
    rows: 5,
    timeout: 120000,
    prepTimeout: 1000,
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
      <skoash.Audio
        type="voiceOver"
        ref="level-up"
        src={'media/_assets/_sounds/_vos/Congratulations.mp3'}
      />,
      <skoash.MediaSequence
        ref="try-again"
        silentOnStart
      >
        <skoash.Audio
          type="voiceOver"
          complete
          src={'media/_assets/_sounds/_vos/TryAgain.mp3'}
        />
        <skoash.Audio
          type="voiceOver"
          ref="try-again"
          complete
          src={'media/_assets/_sounds/_vos/YouDidntWin.mp3'}
        />
      </skoash.MediaSequence>,
    ],
    sfx: [
    ],
    revealList: [
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
