import 'shared/effects/index';

const FIREWORKS = 'fireworks';

const onStart = function () {
    window.CMWN.makeEffect('fireworks', ReactDOM.findDOMNode(this), {
        backgroundImage: ReactDOM.findDOMNode(this.refs.image),
    });
};

export default function (props, ref, key) {
    return (
        <skoash.Screen
            {...props}
            ref={ref}
            key={key}
            id="title"
        >
            <h3>Title Screen</h3>
            <skoash.Component
                className={FIREWORKS}
                ref={FIREWORKS}
                onStart={onStart}
            >
                <skoash.Image
                    ref="image"
                    src={`${CMWN.MEDIA.IMAGE}background.01.jpg`}
                />
            </skoash.Component>
        </skoash.Screen>
    );
}
