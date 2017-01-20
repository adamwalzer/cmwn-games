export default function (props, ref, key) {
    return (
        <skoash.Screen
            {...props}
            ref={ref}
            key={key}
            id="title"
            checkComplete={false}
            completeDelay={3000}
            completeOnStart={true}
            playOnStart="bird-wing-flap"
        >
            <skoash.Audio ref="bird-wing-flap" type="sfx" delay={2000} src={`${ENVIRONMENT.MEDIA_GAME}SoundAssets/effects/BirdWingFlap.mp3`} />
            <skoash.Image className="animated" src={`${ENVIRONMENT.MEDIA_GAME}ImageAssets/img_1.1.png`} />
        </skoash.Screen>
    );
}
