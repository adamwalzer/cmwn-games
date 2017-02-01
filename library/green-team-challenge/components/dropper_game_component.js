import Catcher from 'shared/components/catcher/0.3';
import Catchable from 'shared/components/catchable/0.1';
import Randomizer from 'shared/components/randomizer/0.1';
import ManualDropper from 'shared/components/manual_dropper/0.1';

const PTS = 'pts';

export default function (props, ref, key, opts = {}) {
    var screenProps;
    var timerProps;
    var revealProps;
    var selectableProps;
    var dropperProps;
    var catcherProps;
    var lifeProps;
    var extraComponents;

    const levelPath = `gameState.data.recyclingChampion.levels.${opts.level}`;

    var arrayOfCatchables = _.map(opts.itemsToSort, (v, k) =>
        <Catchable className={k} message={v.bin} reCatchable={true} becomes={v.becomes} />,
    );

    var binComponents = _.map(opts.binNames, name =>
        <skoash.Component className={name} message={name} />
    );

    var start = _.get(props, `${levelPath}.start`, false);
    var gameComplete = _.get(props, `${levelPath}.complete`, false);
    var drop = _.get(props, 'data.manual-dropper.drop', false);
    var dropClass = _.get(props, 'data.manual-dropper.dropClass');
    var next = _.get(props, 'data.manual-dropper.next', false);
    var pickUp = _.get(props, 'data.manual-dropper.pickUp', false);
    var onPickUp = _.get(props, 'data.manual-dropper.onPickUp');
    var catchableRefs = _.get(props, 'data.manual-dropper.refs', []);
    var itemName = _.get(props, 'data.manual-dropper.itemName', '');
    var caught = _.get(props, 'data.catcher.caught', '');
    var revealOpen = _.get(props, 'data.reveal.open', false);
    var revealClose = _.get(props, 'data.reveal.close', false);

    opts.score = _.get(props, `${levelPath}.score`, 0);
    opts.highScore = _.get(props, `${levelPath}.highScore`, 0);
    opts.left = _.get(props, 'data.manual-dropper.left', 0);
    opts.hits = _.get(props, `${levelPath}.hits`, 0);
    opts.truckClassName = _.get(props, 'data.truckClassName', '');
    opts.selectableMessage = _.get(props, 'data.selectable.message', '');

    screenProps = opts.getScreenProps(opts);
    timerProps = opts.getTimerProps(opts);
    revealProps = opts.getRevealProps(opts);
    selectableProps = opts.getSelectableProps(opts);
    dropperProps = opts.getDropperProps(opts);
    catcherProps = opts.getCatcherProps(opts);
    lifeProps = opts.getLifeProps(opts);
    extraComponents = opts.getExtraComponents(opts);

    return (
        <skoash.Screen
            {...props}
            ref={ref}
            key={key}
            id={`${opts.gameName}-${opts.level}`}
            complete={gameComplete}
            checkComplete={!gameComplete}
            {...screenProps}
        >
            <skoash.Component
                className="top-left"
            >
                <skoash.Score
                    className="level-score"
                    correct={opts.score}
                    setScore={true}
                >
                    {PTS}
                </skoash.Score>
                <skoash.Timer
                    countDown
                    format="mm:ss"
                    timeout={opts.timeout}
                    complete={gameComplete}
                    pause={revealOpen}
                    resume={!revealOpen}
                    restart={start}
                    {...timerProps}
                />
            </skoash.Component>
            <skoash.Component
                className="item-name"
            >
                <span>
                    {itemName}
                </span>
            </skoash.Component>
            <skoash.Score
                className="life"
                max={0}
                incorrect={opts.maxHits}
                correct={opts.hits}
                setScore={true}
                {...lifeProps}
            />
            <ManualDropper
                amount={opts.dropperAmount}
                drop={drop}
                pickUp={pickUp}
                onPickUp={onPickUp}
                next={next}
                bin={
                    <Randomizer
                        bin={arrayOfCatchables}
                    />
                }
                style={{
                    transform: `translateX(${opts.left}px)`
                }}
                caught={caught}
                dropClass={dropClass}
                {...dropperProps}
            />
            <skoash.Component
                className="bins"
            >
                <Catcher
                    completeOnStart
                    checkComplete={false}
                    start={start}
                    bucket={binComponents}
                    catchableRefs={catchableRefs}
                    pause={caught}
                    resume={drop}
                    collideFraction={opts.collideFraction}
                    assets={[
                    ]}
                    {...catcherProps}
                />
                <skoash.Selectable
                    {...selectableProps}
                    list={binComponents}
                />
            </skoash.Component>
            {extraComponents}
            <skoash.Reveal
                openTarget="reveal"
                openReveal={revealOpen}
                closeReveal={revealClose}
                {...revealProps}
                list={[
                    <skoash.Component
                        ref="resort"
                        type="li"
                    >
                    </skoash.Component>,
                    <skoash.Component
                        ref="retry"
                        type="li"
                    >
                        <p>RETRY</p>
                    </skoash.Component>,
                    <skoash.Component
                        ref="complete"
                        type="li"
                    >
                        <p>COMPLETE</p>
                    </skoash.Component>,
                ]}
            />
        </skoash.Screen>
    );
}
