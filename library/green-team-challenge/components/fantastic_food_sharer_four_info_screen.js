import InfoScreenComponent from './info_screen_component';

export default function (props, ref, key) {
    return InfoScreenComponent(props, ref, key, {
        id: 'priceless-pourer-four-info',
        content: (
            <p>
                Hey Super Sharer
            </p>
        ),
    });
}
