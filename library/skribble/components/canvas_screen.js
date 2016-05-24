import ItemDrawerCanvas from '../../shared/components/item_drawer_canvas/0.1.js';
import Menu from '../../shared/components/menu/0.1.js';

class CanvasScreen extends play.Screen {
  constructor() {
    super();

    this.state = {
      id: 'canvas',
      menus: {},
    };

  }

  bootstrap() {
    var menus, state;

    play.Screen.prototype.bootstrap.call(this);

    state = play.trigger('getState');

    if (state && state.data && state.data.menus) {
      menus = state.data.menus;
      this.setState({
        menus,
      });
    }
  }

  renderPrevButton() {
    return (
      <button className={'prev-screen'} onClick={this.goto.bind(this, 1)}>{'<'}</button>
    );
  }

  renderNextButton() {
    return null;
  }

  renderContent() {
    return (
      <div>
        <Menu items={this.state.menus} />
        <ItemDrawerCanvas />
      </div>
    );
  }
}

export default CanvasScreen;
