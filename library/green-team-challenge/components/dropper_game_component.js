import classNames from 'classnames';

import Catcher from 'shared/components/catcher/0.4';
import Catchable from 'shared/components/catchable/0.1';
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

    const levelPath = `gameState.data.${_.camelCase(opts.gameName)}.levels.${opts.level}`;

    var getChildren = v => {
        if (v.children) return v.children;

        return (
            <skoash.Sprite
                src={`${CMWN.MEDIA.SPRITE}_${_.replace(v.bin, '-', '')}`}
                frame={v.frame || 1}
                static
            />
        );
    };

    var arrayOfCatchables = _.map(opts.itemsToSort, v =>
        <Catchable
            className={v.name}
            message={v.bin}
            reCatchable={true}
            becomes={v.becomes}
            children={getChildren(v)}
        />
    );

    var binComponents = _.map(opts.binNames, name =>
        <skoash.Component className={name} message={name} />
    );

    var scale = _.get(props, 'gameState.scale', 1);
    var start = _.get(props, `${levelPath}.start`, false);
    var gameComplete = _.get(props, `${levelPath}.complete`, false);
    var drop = _.get(props, 'data.manual-dropper.drop', false);
    var dropClass = _.get(props, 'data.manual-dropper.dropClass');
    var pickUp = _.get(props, 'data.manual-dropper.pickUp', false);
    var onPickUp = _.get(props, 'data.manual-dropper.onPickUp');
    var selectItem = _.get(props, 'data.manual-dropper.selectItem');
    var catchableRefs = _.get(props, 'data.manual-dropper.refs', []);
    var itemRef = _.get(props, 'data.item.ref');
    var removeItemClassName = _.get(props, 'data.item.removeClassName');
    var itemTop = _.get(props, 'data.item.top', 0) / scale;
    var itemLeft = _.get(props, 'data.item.left', 0) / scale || 'auto';
    var caught = _.get(props, 'data.catcher.caught', '');
    var revealOpen = _.get(props, 'data.reveal.open', false);
    var revealClose = _.get(props, 'data.reveal.close', false);

    var audioRefs = _.uniq(_.map(opts.itemsToSort, v =>
        _.upperFirst(_.camelCase(_.replace(v.name, /\d+/g, ''))))
    );

    var arrayOfAudio = _.map(audioRefs, (v, k) =>
        <skoash.Audio
            type="voiceOver"
            ref={v}
            key={k}
            src={`${CMWN.MEDIA.GAME + 'SoundAssets/_vositems/' + v}.mp3`}
        />
    );

    if (itemRef) catchableRefs = [itemRef];

    opts.next = _.get(props, 'data.manual-dropper.next', false);
    opts.itemRef = itemRef;
    opts.itemName = _.get(props, 'data.item.name', '');
    opts.itemClassName = _.get(props, 'data.item.className');
    opts.itemAmount = _.get(props, 'data.item.amount', 0);
    opts.pour = _.get(props, 'data.item.pour', false);
    opts.score = _.get(props, `${levelPath}.score`, 0);
    opts.highScore = _.get(props, `${levelPath}.highScore`, 0);
    opts.left = _.get(props, 'data.manual-dropper.left', 0);
    opts.hits = _.get(props, `${levelPath}.hits`, 0);
    opts.truckClassName = _.get(props, 'data.truckClassName', '');
    opts.selectableMessage = _.get(props, 'data.selectable.message', '');
    opts.moveClaw = _.get(props, 'data.moveClaw', false);

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
                className={classNames('item-name', {
                    ACTIVE: opts.itemName,
                })}
                style={{
                    top: itemTop,
                    left: itemLeft,
                }}
                checkComplete={false}
                complete={true}
            >
                <span>
                    {opts.itemName}
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
                checkComplete={false}
                complete={true}
                amount={opts.dropperAmount}
                drop={drop}
                pickUp={pickUp}
                onPickUp={onPickUp}
                next={opts.next}
                bin={
                    <skoash.Randomizer
                        bin={arrayOfCatchables}
                    />
                }
                style={{
                    transform: `translateX(${opts.left}px)`
                }}
                caught={caught}
                dropClass={dropClass}
                itemRef={itemRef}
                itemClassName={opts.itemClassName}
                removeItemClassName={removeItemClassName}
                selectItem={selectItem}
                {...dropperProps}
            />
            <skoash.Component
                className={classNames('bins', {
                    DISABLED: opts.itemName
                })}
                checkComplete={false}
                complete={true}
            >
                <Catcher
                    completeOnStart
                    checkComplete={false}
                    start={start}
                    bucket={binComponents}
                    catchableRefs={catchableRefs}
                    pause={caught}
                    resume={drop || itemRef}
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
                checkComplete={false}
                complete={true}
                {...revealProps}
                list={[
                    <skoash.Component
                        ref="resort"
                        type="li"
                    />,
                    <skoash.Component
                        ref="retry"
                        type="li"
                    />,
                    <skoash.Component
                        ref="complete"
                        type="li"
                    />,
                ]}
            />
            <skoash.MediaCollection
                children={arrayOfAudio}
                checkComplete={false}
                complete={true}
            />
        </skoash.Screen>
    );
}
