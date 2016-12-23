import addItems from 'shared/phaser/methods/add_items/0.1';

export default function () {
    // a crop should look like
    // [0, 0, 155, 140],

    const generalDefaultProps = {
        image: 'land',
        scale: [.5, .5],
    };

    const woodDefaultProps = {
        image: 'wood',
        scale: [.5, .5],
    };

    const fruitDefaultProps = {
        image: 'fruits',
        scale: [.5, .5],
    };

    const flowerDefaultProps = {
        image: 'flowers',
        scale: [.5, .5],
    };

    const defaultProps = {
        star: {
            image: 'star',
            scale: [.25, .25],
        },
        crow: {
            image: 'crow',
            scale: [.25, .25],
        },
        wind: _.defaults({
            image: 'wind',
        }, generalDefaultProps),
        water: _.defaults({
            image: 'water',
        }, generalDefaultProps),
        web: _.defaults({
            image: 'web',
        }, generalDefaultProps),
        log: _.defaults({
            image: 'log',
        }, generalDefaultProps),
        leaf: _.defaults({
            image: 'leaf',
        }, generalDefaultProps),
        egg: _.defaults({
            image: 'egg',
        }, generalDefaultProps),
        cloud: _.defaults({
            image: 'cloud',
        }, generalDefaultProps),
        wood1: _.defaults({
            frame: 0,
        }, woodDefaultProps),
        wood2: _.defaults({
            frame: 1,
        }, woodDefaultProps),
        wood3: _.defaults({
            frame: 2,
        }, woodDefaultProps),
        land1: _.defaults({
            frame: 0,
        }, generalDefaultProps),
        land2: _.defaults({
            frame: 1,
        }, generalDefaultProps),
        land3: _.defaults({
            frame: 2,
        }, generalDefaultProps),
        land4: _.defaults({
            frame: 3,
        }, generalDefaultProps),
        land5: _.defaults({
            frame: 4,
        }, generalDefaultProps),
        fruit1: _.defaults({
            frame: 0,
        }, fruitDefaultProps),
        fruit2: _.defaults({
            frame: 1,
        }, fruitDefaultProps),
        fruit3: _.defaults({
            frame: 2,
        }, fruitDefaultProps),
        fruit4: _.defaults({
            frame: 3,
        }, fruitDefaultProps),
        flower1: _.defaults({
            image: 'flowers',
        }, flowerDefaultProps),
        flower2: _.defaults({
            image: 'flowers',
        }, flowerDefaultProps),
        flower3: _.defaults({
            image: 'flowers',
        }, flowerDefaultProps),
        flower4: _.defaults({
            image: 'flowers',
        }, flowerDefaultProps),
        flower5: _.defaults({
            image: 'flowers',
        }, flowerDefaultProps),
        flower6: _.defaults({
            image: 'flowers',
        }, flowerDefaultProps),
    };

    const groups = {
        star: 'stars',
        crow: 'crows',
        wind: 'winds',
        water: 'waters',
        web: 'webs',
        log: 'logs',
        leaf: 'leafs',
        egg: 'eggs',
        cloud: 'clouds',
        wood1: 'logs',
        wood2: 'logs',
        wood3: 'logs',
        land1: 'lands',
        land2: 'lands',
        land3: 'lands',
        land4: 'lands',
        land5: 'lands',
        fruit1: 'fruits',
        fruit2: 'fruits',
        fruit3: 'fruits',
        fruit4: 'fruits',
        flower1: 'flowers',
        flower2: 'flowers',
        flower3: 'flowers',
        flower4: 'flowers',
        flower5: 'flowers',
        flower6: 'flowers',
    };

    var getObjects = function (objects = [], amounts = {}) {
        return objects.concat(_.shuffle(_.reduce(amounts, (a, v, k) =>
            a.concat(_.times(v || 0, () => k)), [])));
    };

    var objects = getObjects([], this.opts.itemAmounts);

    var locations = _.reduce(this.opts.itemAmounts, (a, v, k) => {
        a[k] = [];
        return a;
    }, {});

    var placeObject = function (top, left) {
        var object = objects.shift();
        if (locations[object]) {
            locations[object].push({
                top,
                left,
            });
        }
    };

    for (let left = 500; left < this.game.world.width; left += 200) {
        placeObject(200, left);
        if (!objects.length) break;
    }

    _.each(locations, (locationArray, key) => {
        if (key === 'blank') return;
        addItems.call(this, {
            group: groups[key], defaultOpts: defaultProps[key]
        }, locationArray);
    });

    if (this.stars) {
        _.each(this.stars.children, star => {
            star.animations.add('spin', [0, 1, 2, 3, 4, 5], 10, true);
            star.animations.play('spin');
        });
    }
}
