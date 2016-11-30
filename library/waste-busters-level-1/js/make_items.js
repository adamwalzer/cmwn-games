import addItems from 'shared/phaser/methods/add_items/0.1';

export default function () {
    const crops = [
        [0, 0, 155, 140],
        [155, 0, 155, 140],
        [310, 0, 155, 140],
        [465, 0, 155, 140],
        [620, 0, 155, 140],
        [775, 0, 155, 140],
    ];

    const generalDefaultProps = {
        image: 'items',
        gravityY: 12,
        body: [115, 100, 20, 50],
        scale: [.5, .5],
    };

    const defaultProps = {
        squareBush: _.defaults({
            crop: crops[0],
        }, generalDefaultProps),
        roundBush: _.defaults({
            crop: crops[1],
        }, generalDefaultProps),
        snake: _.defaults({
            crop: crops[2],
            body: [115, 20, 20, 50],
        }, generalDefaultProps),
        bag: _.defaults({
            crop: crops[3],
        }, generalDefaultProps),
        rock: _.defaults({
            crop: crops[4],
        }, generalDefaultProps),
        stump: _.defaults({
            crop: crops[5],
            body: [115, 120, 20, 50],
        }, generalDefaultProps),
    };

    const groups = {
        squareBush: 'bushes',
        roundBush: 'bushes',
        snake: 'enemies',
        bag: 'bags',
        rock: 'obstacles',
        stump: 'obstacles',
    };

    var objects = _.shuffle([]
        .concat(_.times(1, () => 'squareBush'))
        .concat(_.times(1, () => 'roundBush'))
        .concat(_.times(0, () => 'snake'))
        .concat(_.times(5, () => 'bag'))
        .concat(_.times(5, () => ''))
        .concat(_.times(1, () => 'rock'))
        .concat(_.times(1, () => 'stump'))
    );

    var locations = {
        squareBush: [],
        roundBush: [],
        snake: [],
        bag: [],
        rock: [],
        stump: [],
    };

    _.every(this.platforms.children, platform => {
        var object = objects.shift();
        if (locations[object]) {
            locations[object].push({
                top: platform.top - 50,
                left: platform.left + 30,
            });
        }
        return objects.length;
    });

    objects = objects.concat(_.shuffle([]
        .concat(_.times(1, () => 'squareBush'))
        .concat(_.times(1, () => 'roundBush'))
        .concat(_.times(2, () => 'snake'))
        .concat(_.times(5, () => 'bag'))
        .concat(_.times(1, () => 'rock'))
        .concat(_.times(1, () => 'stump'))
    ));

    objects.unshift('');

    _.every(this.ground.children, platform => {
        var object = objects.shift();
        if (locations[object]) {
            locations[object].push({
                top: platform.top - 50,
                left: platform.left + 30,
            });
        }
        return objects.length;
    });

    _.each(locations, (locationArray, key) => {
        addItems.call(this, {
            group: groups[key], defaultOpts: defaultProps[key]
        }, locationArray);
    });
}
