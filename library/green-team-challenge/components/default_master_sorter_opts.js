import defaultGameOpts from './default_game_opts';
import Catchable from 'shared/components/catchable/0.1';
import itemsToSort from './items_to_sort';

const binNames = [
    'liquids',
    'food-share',
    'recycle',
    'landfill',
    'compost',
    'tray-stacking',
];

const mapItems = function (itemNames) {
    const items = _.filter(itemsToSort, item => _.includes(itemNames, item.name));

    return _.map(items, item =>
        <Catchable
            className={item.name}
            message={item.bin}
            reCatchable={true}
            becomes={item.becomes}
        />
    );
};

export default _.defaults({
    gameName: 'master-sorter',
    dropperAmount: 2,
    binNames,
    getSelectableProps(opts) {
        return {
            onSelect: function (binRefKey) {
                var dropClass = _.toUpper(opts.binNames[binRefKey]);
                if (opts.itemRef) {
                    this.updateScreenData({
                        keys: ['item', 'className'],
                        data: dropClass,
                    });
                    return;
                }

                this.updateScreenData({
                    key: 'manual-dropper',
                    data: {
                        drop: true,
                        dropClass,
                    }
                });
            },
        };
    },
    getDropperProps(opts) {
        let props = defaultGameOpts.getDropperProps.call(this, opts);

        props.onTransitionEnd = function (e) {
            let tray = this.refs['items-' + this.firstItemIndex];
            let itemRef = !opts.itemRef ? tray :
                tray.refs['children-0'].refs[_.indexOf(tray.refs['children-0'].state.classes, 'SELECTED')];
            let DOMNode;
            let onAnimationEnd;

            if (e.propertyName !== 'top') return;
            if (opts.itemClassName !== 'LIQUIDS' && this.props.dropClass !== 'LIQUIDS') return;
            if (itemRef.props.message !== 'liquids') return;

            DOMNode = ReactDOM.findDOMNode(itemRef);

            if (DOMNode !== e.target) return;

            if (opts.itemRef) {
                onAnimationEnd = () => {
                    let newBin = _.find(itemsToSort, itemToSort =>
                        itemToSort.name === itemRef.props.becomes
                    ).bin;
                    itemRef.props.message = newBin;
                    itemRef.props['data-message'] = newBin;

                    this.updateScreenData({
                        key: 'item',
                        data: {
                            removeClassName: true,
                            className: null,
                        }
                    });

                    DOMNode.removeEventListener('animationend', onAnimationEnd);
                };

                if (!_.includes(opts.itemClassName, 'POUR')) {
                    DOMNode.addEventListener('animationend', onAnimationEnd);
                    this.updateScreenData({
                        keys: ['item', 'className'],
                        data: 'POUR',
                    });
                }
            }
        };

        props.onComponentWillReceiveProps = function (nextProps) {
            if (nextProps.itemRef != null) {
                if (nextProps.itemClassName != null &&
                    nextProps.itemClassName !== this.props.itemClassName) {
                    let selectable = this.refs['items-' + this.firstItemIndex].refs['children-0'];
                    let itemIndex = _.indexOf(selectable.state.classes, selectable.props.selectClass);
                    let item = selectable.refs[itemIndex];
                    item.addClassName(nextProps.itemClassName);
                }

                if (nextProps.removeItemClassName &&
                    nextProps.removeItemClassName !== this.props.itemClassName) {
                    let selectable = this.refs['items-' + this.firstItemIndex].refs['children-0'];
                    let itemIndex = _.indexOf(selectable.state.classes, selectable.props.selectClass);
                    let item = selectable.refs[itemIndex];
                    item.removeAllClassNames();
                    this.updateScreenData({
                        key: 'item',
                        data: {
                            className: null,
                            removeClassName: false,
                        }
                    });
                }
            }
        };

        return props;
    },
    getCatcherProps(opts) {
        return {
            onCorrect: function (bucketRef) {
                this.updateGameData({
                    keys: [_.camelCase(opts.gameName), 'levels', opts.level, 'score'],
                    data: opts.score + opts.pointsPerItem,
                });

                if (opts.itemRef) {
                    opts.itemRef.addClassName('CAUGHT');
                    this.updateScreenData({
                        key: 'item',
                        data: {
                            name: null,
                            ref: null,
                            className: null,
                        }
                    });
                    return;
                }

                if (bucketRef.props.message !== 'liquids') {
                    this.updateScreenData({
                        keys: ['manual-dropper', 'next'],
                        data: true,
                    });
                    return;
                }
            },
            onIncorrect: function () {
                let hits = opts.hits + 1;

                this.updateGameData({
                    keys: [_.camelCase(opts.gameName), 'levels', opts.level],
                    data: {
                        start: false,
                        hits,
                    }
                });

                this.updateScreenData({
                    key: 'item',
                    data: {
                        removeClassName: true,
                        className: null,
                    }
                });

                // if (hits === opts.maxHits) {
                //     setTimeout(() => {
                //         this.updateScreenData({
                //             keys: ['manual-dropper', 'pickUp'],
                //             data: true,
                //         });
                //     }, 1000);
                //     return;
                // }

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
            },
        };
    },
    itemsToSort: [
        {
            name: 'tray',
            bin: 'tray-stacking',
            children: [
                <skoash.Selectable
                    onSelect={function (key) {
                        var ref = this.refs[key];
                        var rect = ReactDOM.findDOMNode(ref).getBoundingClientRect();
                        this.updateScreenData({
                            key: 'item',
                            data: {
                                name: _.startCase(ref.props.className),
                                ref,
                                top: rect.top,
                                left: rect.left,
                            }
                        });
                    }}
                    list={mapItems([
                        'emptyBottle',
                        'appleCore',
                        'candyBag',
                        'fullBottle',
                        'wrappedSnack',
                    ])}
                />
            ]
        }
    ],
}, defaultGameOpts);
