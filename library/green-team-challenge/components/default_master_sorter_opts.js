import defaultGameOpts from './default_game_opts';
import Catchable from 'shared/components/catchable/0.1';

const mapItems = function (items) {
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
    binNames: [
        'liquids',
        'food-share',
        'recycle',
        'landfill',
        'compost',
        'tray-stacking',
    ],
    getSelectableProps(opts) {
        return {
            onSelect: function (binRefKey) {
                var dropClass = _.toUpper(opts.binNames[binRefKey]);
                if (opts.itemRef) {
                    _.invoke(opts, 'itemRef.addClassName', dropClass);
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
            let itemRef = this.refs['items-' + this.firstItemIndex];
            let DOMNode;
            let onAnimationEnd;

            if (this.props.dropClass !== 'LIQUIDS') return;
            if (itemRef.props.message !== 'liquids') return;

            DOMNode = ReactDOM.findDOMNode(itemRef);

            if (DOMNode !== e.target) return;

            onAnimationEnd = () => {
                this.pickUp(_.defaults({
                    onPickUp: function () {
                        let items = this.state.items;
                        let index = this.firstItemIndex;
                        let item = items[index];
                        let newBin = opts.itemsToSort[item.props.becomes].bin;
                        item.props.className = item.props.becomes;
                        item.props.message = newBin;
                        item.props['data-message'] = newBin;
                        items[index] = item;
                        this.setState({items});
                        DOMNode.removeEventListener('animationend', onAnimationEnd);
                    }
                }, this.props));
            };

            if (!itemRef.state.className || _.includes(itemRef.state.className, 'POUR')) {
                DOMNode.addEventListener('animationend', onAnimationEnd);
                itemRef.addClassName('POUR');
            }
        };

        return props;
    },
    getCatcherProps(opts) {
        var props = defaultGameOpts.getCatcherProps.call(this, opts);

        props.onCorrect = function (bucketRef) {
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
        };

        return props;
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
                        {
                            name: 'emptyBottle',
                            bin: 'recycle'
                        },
                        {
                            name: 'appleCore',
                            bin: 'compost'
                        },
                        {
                            name: 'candyBag',
                            bin: 'landfill'
                        },
                        {
                            name: 'fullBottle',
                            bin: 'liquids',
                            becomes: 'emptyBottle'
                        },
                        {
                            name: 'wrappedSnack',
                            bin: 'food-share'
                        }
                    ])}
                />
            ]
        }
    ],
}, defaultGameOpts);
