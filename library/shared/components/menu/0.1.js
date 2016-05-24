import Selectable from '../selectable/0.1.js';

import classNames from 'classnames';

class Menu extends Selectable {
  constructor() {
    super();

    this.state = {
      active: false,
      selectClass: 'SELECTED',
      classes: {},
    };
  }

  onClick(e) {
    var li, message, active = false, classes = [];

    li = e.target.closest('LI');

    if (!li) return;

    message = li.getAttribute('data-ref');

    if (this.state.classes[message] !== this.state.selectClass) {
      classes[message] = this.state.selectClass;
      active = true;
    }

    this.setState({
      classes,
      active,
    });
  }

  renderItems() {
    var self = this;

    if (typeof this.props.items !== 'object') return;

    return Object.keys(this.props.items).map((key) => {
      var item, onClick, gotoObj, categories;

      categories = this.props.categories || [];
      categories.push(key);

      item = this.props.items[key];

      if (!item.items) {
        gotoObj = {
          index: 'item-drawer',
          categories,
        };
        onClick = play.trigger.bind(null, 'goto', gotoObj);
      }

      return (
        <play.ListItem
          className={self.getClass(key)}
          data-ref={key}
          ref={key}
          key={key}
          onClick={onClick}
        >
          {key}
          {(() => {
            if (typeof item.items !== 'object') return;
            return (
              <Menu categories={categories} items={item.items} />
            );
          })()}
        </play.ListItem>
      );
    });
  }

  getClassNames() {
    return classNames({
      menu: true,
      ACTIVE: this.state.active,
    });
  }

  render() {
    return (
      <ul
        className={this.getClassNames()}
        onClick={this.onClick.bind(this)}
      >
        {this.renderItems()}
      </ul>
    );
  }
}

export default Menu;
