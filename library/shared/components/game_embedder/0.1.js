class GameEmbedder extends skoash.Component {
    constructor() {
        super();

        this.respond = this.respond.bind(this);
        this.onLoad = this.onLoad.bind(this);
    }

    bootstrap() {
        super.bootstrap();

        this.gameNode = ReactDOM.findDOMNode(this.refs.game);
        this.gameNode.addEventListener('game-event', this.respond);
    }

    respond(opts) {
        if (opts.complete) {
            this.complete();
        } else if (opts.updateGameState) {
            this.updateGameState(opts);
        }
    }

    onLoad() {
        this.emitEvent({
            name: 'focus',
        });

        this.props.onLoad.call(this);
    }

    pause() {
        super.pause();
        this.emitEvent({ name: 'pause' });
    }

    resume() {
        super.resume();
        this.emitEvent({ name: 'resume' });
    }

    emitEvent(data) {
        var e = new Event('skoash-event');
        e.name = data.name;
        e.data = data;
        this.gameNode.contentWindow.dispatchEvent(e);
    }

    componentWillReceiveProps(props) {
        super.componentWillReceiveProps(props);

        if (props.controller) {
            this.emitEvent({
                name: 'controller-update',
                controller: props.controller,
            });
        }
    }

    render() {
        return (
            <iframe
                {...this.props}
                ref="game"
                onLoad={this.onLoad}
            />
        );
    }
}

GameEmbedder.defaultProps = _.defaults({
    complete: false,
    checkComplete: false,
    onLoad: _.noop,
}, skoash.Component.defaultProps);

export default GameEmbedder;
