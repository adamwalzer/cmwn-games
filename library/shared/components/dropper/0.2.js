import classNames from 'classnames';

import Draggable from 'shared/components/draggable/0.1';

import Randomizer from 'shared/components/randomizer/0.1';
import Catchable from 'shared/components/catchable/0.1';

class Dropper extends Draggable {
    constructor() {
        super();

        this.state = _.defaults({
            items: {},
            itemCount: 0,
            itemEndXs: {},
            direction: '',
        }, this.state);

        this.next = this.next.bind(this);
    }

    next(on) {
        var items, index;

        if (!this.state.started || (!this.props.on && !on)) return;

        index = this.state.itemCount;
        items = this.state.items;
        items[index] = this.refs.bin.get(1)[0];

        this.setState({
            items,
            itemCount: index + 1,
        }, () => {
            var timeoutFunction = i => {
                var itemRef, itemEndXs;
                itemRef = this.refs['items-' + index];
                if (itemRef) {
                    itemRef.addClassName(this.props.prepClasses[i]);
                    this.props.onAddClassName.call(this, this.props.prepClasses[i]);
                    if (i === this.props.prepClasses.length - 1) {
                        itemEndXs = this.state.itemEndXs;
                        itemEndXs[index] = this.state.endX;
                        ReactDOM.findDOMNode(itemRef).addEventListener('transitionend', () => {
                            items = this.state.items;
                            delete items[index];
                            this.setState({
                                items,
                                itemEndXs
                            });
                        });
                    }
                }

                if (i === this.props.prepClasses.length) this.next();
            };

            for (let i = 0; i <= this.props.prepClasses.length; i++) {
                setTimeout(() => {
                    timeoutFunction(i);
                }, i * this.props.prepTimeout);
            }

            this.updateGameState({
                path: this.props.refsTarget,
                data: {
                    refs: _.filter(this.refs, (v, k) => !k.indexOf('items-')),
                }
            });
        });
    }

    moveEvent(e) {
        var endX;

        if (e.targetTouches && e.targetTouches[0]) {
            e.pageX = e.targetTouches[0].pageX;
        }

        endX = Math.min(Math.max(e.pageX - this.state.grabX, this.props.leftBound), this.props.rightBound);

        this.setState({
            endX,
            direction: endX > this.state.endX ? 'right' : 'left'
        });
    }

    componentWillReceiveProps(props) {
        super.componentWillReceiveProps(props);

        if (props.on === true && props.on !== this.props.on) {
            this.next(true);
        }
    }

    getItemStyle(key) {
        var endX, x;

        endX = this.state.itemEndXs[key] || this.state.endX;
        x = ((endX - this.state.startX) / this.state.zoom);

        return {
            transform: `translateX(${x}px)`,
            WebkitTransform: `translateX(${x}px)`,
        };
    }

    getStyle() {
        var x = ((this.state.endX - this.state.startX) / this.state.zoom);

        return {
            transform: `translateX(${x}px)`,
            WebkitTransform: `translateX(${x}px)`,
        };
    }

    getClassNames() {
        return classNames('dropper', this.state.direction, super.getClassNames());
    }

  /*
   * shortid is intentionally not used for key here because we want to make sure
   * that the element is transitioned and not replaced.
   */
    renderItems() {
        return _.map(this.state.items, (item, key) => {
            var ref = 'items-' + key;
            if (!item) return null;
            return (
        <item.type
          {...item.props}
          style={this.getItemStyle(key)}
          data-ref={ref}
          data-message={item.props.message}
          ref={ref}
          key={key}
        />
      );
        });
    }

    renderBin() {
        return (
      <this.props.bin.type
        {...this.props.bin.props}
        ref="bin"
      />
    );
    }

    render() {
        return (
      <div
        className={this.getClassNames()}
      >
        {this.renderBin()}
        <div
          ref="el"
          className="el"
          style={this.getStyle()}
        >
          {this.renderContentList()}
        </div>
        <ul className="items">
          {this.renderItems()}
        </ul>
      </div>
    );
    }
}

Dropper.defaultProps = _.defaults({
    prepClasses: ['ready', 'set', 'go'],
    prepTimeout: 1000,
    bin: (
    <Randomizer
      bin={[
          <Catchable />,
      ]}
    />
  ),
    onStart: function () {
        this.next();
    },
    leftBound: 0,
    rightBound: 800,
    refsTarget: 'dropper',
    on: true,
}, Draggable.defaultProps);

export default Dropper;
