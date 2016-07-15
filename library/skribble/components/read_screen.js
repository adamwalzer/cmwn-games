import Selectable from '../../shared/components/selectable/0.1.js';

const classNameText = {
  skribbleBox: 'skribble-box',
  box: 'box',
  leftMenu: 'menu left-menu',
  rightMenu: 'menu right-menu',
  sender: 'menu recipient sender',
};

const refs = {
  box: 'box',
};

class ReadScreen extends skoash.Screen {
  constructor() {
    super();

    this.state = {
      load: true,
      message: {
        user: {}
      },
    };

    this.leftMenuList = [
      <li className="inbox" onClick={this.goto.bind(this, 'inbox')}>
        <span />
      </li>
    ];

    this.rightMenuList = [
      <li className="reply" onClick={this.reply.bind(this)}>
        <span />
      </li>
    ];
  }

  reply() {
    skoash.trigger('passData', {
      name: 'add-recipient',
      message: this.state.message.created_by,
    });
  }

  open(opts) {
    var message = opts.message || {};

    this.setState({
      load: true,
      open: true,
      leave: false,
      close: false,
      message
    });

    this.start();
  }

  renderSender() {
    var message, friends, creater, content = [];

    message = this.state.message;

    if (!message) return;

    friends = skoash.trigger('getState').data.user || [];
    friends.some(friend => {
      if (message.created_by === friend.friend_id) {
        creater = friend;
        return false;
      }
      return true;
    });

    if (!creater) return;

    if (creater.username) {
      content.push(<span className="name">{creater.username}</span>);
    }

    if (creater._embedded.image) {
      content.push(<img className="profile-image" src={creater._embedded.image.url} />);
    }

    return content;
  }

  renderContent() {
    return (
      <div>
        <ul className={classNameText.sender}>
          <li>
            <span>
              {this.renderSender()}
            </span>
          </li>
        </ul>
        <skoash.Component ref={refs.box} className={classNameText.skribbleBox}>
          <skoash.Image src={this.state.message.src} />
          <div className={classNameText.box} />
        </skoash.Component>
        <Selectable className={classNameText.leftMenu} list={this.leftMenuList} />
        <Selectable className={classNameText.rightMenu} list={this.rightMenuList} />
      </div>
    );
  }
}

export default (
  <ReadScreen
    id="read"
    hideNext
    hidePrev
  />
);
