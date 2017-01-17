import Carousel from 'shared/components/carousel/0.1';
import Dropzone from 'shared/components/dropzone/0.4';

const PTS = 'pts';

export default function (props, ref, key, opts = {}) {
    var screenProps;
    var timerProps;
    var carouselProps;
    var revealProps;
    var lifeProps;

    const levelPath = `gameState.data.recyclingChampion.levels.${opts.level}`;

    var binComponents = _.map(opts.binNames, name =>
        <skoash.Component className={name} message={name} />
    );

    var start = _.get(props, `${levelPath}.start`, false);
    var gameComplete = _.get(props, `${levelPath}.complete`, false);
    var itemName = _.get(props, 'data.manual-dropper.itemName', '');
    var binName = _.get(props, 'data.carousel.binName', '');
    var revealOpen = _.get(props, 'data.reveal.open', false);
    var revealClose = _.get(props, 'data.reveal.close', false);

    opts.score = _.get(props, `${levelPath}.score`, 0);
    opts.highScore = _.get(props, `${levelPath}.highScore`, 0);
    opts.hits = _.get(props, `${levelPath}.hits`, 0);
    opts.truckClassName = _.get(props, 'data.truckClassName', '');
    opts.selectableMessage = _.get(props, 'data.selectable.message', '');

    screenProps = opts.getScreenProps(opts);
    timerProps = opts.getTimerProps(opts);
    carouselProps = opts.getCarouselProps(opts);
    revealProps = opts.getRevealProps(opts);
    lifeProps = opts.getLifeProps(opts);

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
            <skoash.Component
                className="bin-name"
            >
                <span>
                    {binName}
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
            <Dropzone

            />
            <Carousel
                className="bins"
                showNum={1}
                bin={<skoash.Randomizer
                    bin={binComponents}
                />}
                {...carouselProps}
            />
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
