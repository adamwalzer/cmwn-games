import classNames from 'classnames';
import defaultGameOpts from './default_game_opts';
import itemsToSort from './items_to_sort';

const PICKUP = 'PICKUP';
const DROPPED = 'DROPPED';
const TILT = 'TILT';
const ITEMS = 'items-';

const BELT_SRC = CMWN.MEDIA.SPRITE + 'level.3.conveyor.belt';
const CLAW_SRC = CMWN.MEDIA.SPRITE + 'taking.food.assets';
const CLAW_DROP_SRC = CMWN.MEDIA.SPRITE + 'dropping.in.funnel';
const FUNNEL_SRC = CMWN.MEDIA.SPRITE + 'front.back.funnel';

const binNames = [
    'food-share',
    'recycle',
    'landfill',
    'compost',
    'liquids',
];

const onTruckTransitionEnd = function (opts, e) {
    skoash.trigger('updateScreenData', {
        data: {
            'manual-dropper': {
                drop: _.includes(e.target.className, TILT),
                dropClass: _.toUpper(_.snakeCase(opts.selectableMessage)),
            },
            'selectable': {
                message: ''
            }
        }
    });
};

const onItemPickUpTransitionEnd = function (itemRef) {
    if (_.includes(itemRef.state.className, PICKUP)) {
        itemRef.removeAllClassNames();
        skoash.trigger('updateScreenData', {
            key: 'truckClassName',
            data: '',
        });
    }
};

export default _.defaults({
    gameName: 'fantastic-food-sharer',
    binNames,
    getSelectableProps() {
        return {
            onSelect: function (dataRef) {
                this.updateScreenData({
                    data: {
                        'manual-dropper': {
                            drop: true,
                        },
                        selectable: {
                            message: this.props.list[dataRef].props.message
                        },
                        moveClaw: true,
                    }
                });
            },
        };
    },
    getDropperProps(opts) {
        return {
            onTransitionEnd: function (e) {
                if (e.propertyName === 'top' && _.includes(e.target.className, DROPPED)) {
                    let itemRef = this.refs[ITEMS + this.firstItemIndex];
                    let DOMNode;
                    let onAnimationEnd;

                    this.updateScreenData({
                        key: 'truckClassName',
                        data: TILT,
                    });

                    if (opts.selectableMessage !== 'liquids') return;

                    if (itemRef.props.message !== 'liquids') {
                        let hits = opts.hits + 1;

                        this.updateGameData({
                            keys: [_.camelCase(opts.gameName), 'levels', opts.level],
                            data: {
                                start: false,
                                hits,
                            }
                        });

                        if (hits === opts.maxHits) {
                            setTimeout(() => {
                                this.updateScreenData({
                                    keys: ['manual-dropper', 'pickUp'],
                                    data: true,
                                });
                            }, 1000);
                            return;
                        }

                        this.updateScreenData({
                            keys: ['reveal', 'open'],
                            data: 'resort',
                            callback: () => {
                                setTimeout(() => {
                                    this.updateScreenData({
                                        data: {
                                            reveal: {
                                                open: null,
                                                close: true,
                                            },
                                            'manual-dropper': {
                                                pickUp: true,
                                            },
                                            catcher: {
                                                caught: false,
                                            }
                                        }
                                    });
                                }, 1000);
                            }
                        });

                        return;
                    }

                    DOMNode = ReactDOM.findDOMNode(itemRef);

                    if (DOMNode !== e.target) return;

                    onAnimationEnd = () => {
                        this.pickUp(_.defaults({
                            onPickUp: function () {
                                let items = this.state.items;
                                let index = this.firstItemIndex;
                                let item = items[index];
                                item.props.className = item.props.becomes.name;
                                item.props.message = item.props.becomes.bin;
                                item.props['data-message'] = item.props.becomes.bin;
                                items[index] = item;
                                this.setState({items}, () => {
                                    itemRef.removeAllClassNames();
                                    this.updateScreenData({
                                        data: {
                                            item: {
                                                name: _.startCase(
                                                    _.replace(item.props.becomes.name, /\d+/g, '')
                                                ),
                                                pour: false,
                                            },
                                            'manual-dropper': {
                                                dropClass: '',
                                            },
                                            truckClassName: '',
                                        }
                                    });
                                });
                                DOMNode.removeEventListener('animationend', onAnimationEnd);
                            }
                        }, this.props));
                    };

                    if (!itemRef.state.className || itemRef.state.className.indexOf('POUR') === -1) {
                        DOMNode.addEventListener('animationend', onAnimationEnd);
                        itemRef.addClassName('POUR');
                        this.updateScreenData({
                            key: ['item', 'pour'],
                            data: true,
                        });
                    }
                }
            },
            onPickUp: function (itemRef) {
                itemRef.removeAllClassNames(() => {
                    if (!itemRef.DOMNode) itemRef.DOMNode = ReactDOM.findDOMNode(itemRef);
                    itemRef.DOMNode.addEventListener(
                        'transitionend',
                        onItemPickUpTransitionEnd.bind(null, itemRef)
                    );
                    itemRef.addClassName(PICKUP);
                });
            },
            onNext: function () {
                this.updateScreenData({
                    data: {
                        'manual-dropper': {
                            drop: !!opts.selectableMessage,
                            itemName: _.startCase(this.getFirstItem().props.className),
                        },
                        item: {
                            name: _.startCase(_.replace(this.getFirstItem().props.className, /\d+/g, '')),
                        },
                        selectable: {
                            message: ''
                        },
                        truckClassName: '',
                    },
                });
            },
        };
    },
    getCatcherProps(opts) {
        var props = defaultGameOpts.getCatcherProps.call(this, opts);

        props.onCorrect = function (bucketRef) {
            this.updateGameData({
                keys: [_.camelCase(opts.gameName), 'levels', opts.level, 'score'],
                data: opts.score + opts.pointsPerItem,
            });

            if (bucketRef.props.message !== 'liquids') {
                this.updateScreenData({
                    keys: ['manual-dropper', 'next'],
                    data: true,
                });
                return;
            }
        };

        return props;
    },
    getExtraComponents(opts) {
        return (
            <skoash.Component
                className="extras"
            >
                <skoash.Sprite
                    className="claw grabber"
                    src={CLAW_SRC}
                    frame={0}
                    loop={false}
                    animate={opts.moveClaw}
                    onComplete={function () {
                        this.setState({frame: this.props.frame});
                    }}
                />
                <skoash.Sprite
                    className="claw dropper"
                    src={CLAW_DROP_SRC}
                    frame={0}
                    loop={false}
                    animate={opts.moveClaw}
                    onComplete={function () {
                        this.setState({frame: this.props.frame});
                    }}
                />
                <skoash.Sprite
                    className="belt"
                    src={BELT_SRC}
                    frame={0}
                    loop={false}
                    duration={500}
                    animate={opts.next}
                    onComplete={function () {
                        this.setState({frame: this.props.frame});
                    }}
                />
                <skoash.Component className="funnel">
                    <skoash.Sprite
                        className="back"
                        src={FUNNEL_SRC}
                        frame={0}
                        static
                    />
                    <skoash.Sprite
                        className="front"
                        src={FUNNEL_SRC}
                        frame={1}
                        static
                    />
                </skoash.Component>
                <skoash.Component
                    className={classNames('truck', opts.truckClassName)}
                    onTransitionEnd={onTruckTransitionEnd.bind(null, opts)}
                />
                <div className="truck-stand" />
            </skoash.Component>
        );
    },
    itemsToSort: _.filter(itemsToSort, item => _.includes(binNames, item.bin)),
}, defaultGameOpts);
