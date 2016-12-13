import config from './config.game';

import Loader from 'shared/components/loader/0.1';

import iOSScreen from 'shared/components/ios_splash_screen/0.1';
import TitleScreen from './components/title_screen';
import ThinkScreen from './components/think_screen';
import InfoNoWaterScreen from './components/info_no_water_screen';
import InfoImpactScreen from './components/info_impact_screen';
import InfoNeedWaterScreen from './components/info_need_water_screen';
import InfoUseWaterScreen from './components/info_use_water_screen';
import BalloonsScreen from './components/balloons_screen';
import InfoGreatJobScreen from './components/info_great_job_screen';
import InfoEnvironmentEffectsScreen from './components/info_environment_effects_screen';
import EnvironmentEffectsScreen from './components/environment_effects_screen';
// import InfoHumanEffectsScreen from './components/info_human_effects_screen';
// import HumanEffectsScreen from './components/human_effects_screen';
import WhatCanWeDoScreen from './components/what_can_we_do_screen';
import InfoDrainScreen from './components/info_drain_screen';
import InfoUsingLessScreen from './components/info_using_less_screen';
import ShowerScreen from './components/shower_screen';
import ConserveScreen from './components/conserve_screen';
import HeroScreen from './components/hero_screen';
import FlipScreen from './components/flip_screen';

import QuitScreen from 'shared/components/quit_screen/0.1';

var DroughtOut;

ENVIRONMENT.MEDIA_GAME = ENVIRONMENT.MEDIA + 'Games/DroughtOut/';

DroughtOut = (
    <skoash.Game
        config={config}
        screens={[
            iOSScreen,
            TitleScreen,
            ThinkScreen,
            InfoNoWaterScreen,
            InfoImpactScreen,
            InfoNeedWaterScreen,
            InfoUseWaterScreen,
            BalloonsScreen,
            InfoGreatJobScreen,
            InfoEnvironmentEffectsScreen,
            EnvironmentEffectsScreen,
            // InfoHumanEffectsScreen,
            // HumanEffectsScreen,
            WhatCanWeDoScreen,
            InfoDrainScreen,
            InfoUsingLessScreen,
            ShowerScreen,
            ConserveScreen,
            HeroScreen,
            FlipScreen
        ]}
        menus={{
            quit: QuitScreen,
        }}
        loader={<Loader />}
        getBackgroundIndex={(index, id) => {
            switch (id) {
                case 'title':
                    return 0;
                case 'think':
                    return;
                case 'info-no-water':
                case 'info-impact':
                case 'info-need-water':
                case 'info-use-water':
                    return 1;
                case 'balloons':
                case 'info-great-job':
                    return 2;
                case 'info-environment-effects':
                case 'environment-effects':
                case 'what-can-we-do':
                    return 3;
                case 'conserve':
                case 'hero':
                    return 4;
                case 'info-drain':
                case 'shower':
                    return 5;
                case 'info-using-less':
                    return 6;
                case 'flip':
                    return 7;
            }
        }}
        assets={[
            <skoash.Audio
                ref="bkg-0"
                type="background"
                src={ENVIRONMENT.MEDIA_GAME + 'SoundAssets/effects/Theme.mp3'}
            />,
            <skoash.Audio
                ref="bkg-1"
                type="background"
                src={ENVIRONMENT.MEDIA_GAME + 'SoundAssets/effects/BKG1.mp3'}
                loop
            />,
            <skoash.Audio
                ref="bkg-2"
                type="background"
                src={ENVIRONMENT.MEDIA_GAME + 'SoundAssets/effects/BKG2.mp3'}
                loop
            />,
            <skoash.Audio
                ref="bkg-3"
                type="background"
                src={ENVIRONMENT.MEDIA_GAME + 'SoundAssets/effects/BKG3.mp3'}
                loop
            />,
            <skoash.Audio
                ref="bkg-4"
                type="background"
                src={ENVIRONMENT.MEDIA_GAME + 'SoundAssets/effects/BKG4.mp3'}
            />,
            <skoash.Audio
                ref="bkg-5"
                type="background"
                src={ENVIRONMENT.MEDIA_GAME + 'SoundAssets/effects/BKG5.mp3'}
            />,
            <skoash.Audio
                ref="bkg-6"
                type="background"
                src={ENVIRONMENT.MEDIA_GAME + 'SoundAssets/effects/CashRegister.mp3'}
            />,
            <skoash.Audio
                ref="bkg-7"
                type="background"
                src={ENVIRONMENT.MEDIA_GAME + 'SoundAssets/effects/FlipBKG.mp3'}
            />,
            <skoash.Audio
                ref="button"
                type="sfx"
                src={ENVIRONMENT.MEDIA_GAME + 'SoundAssets/effects/Next.mp3'}
            />,
            <skoash.Audio
                ref="screen-complete"
                type="sfx"
                src={ENVIRONMENT.MEDIA_GAME + 'SoundAssets/effects/WhooHoo.mp3'}
            />,
            <div className="background-1" />,
            <div className="background-2" />,
            <div className="background-3" />,
            <div className="background-4" />,
            <div className="background-5" />,
            <skoash.Image
                ref="bkg-image-1"
                className="hidden"
                src={ENVIRONMENT.MEDIA_GAME + 'ImageAssets/BKG_1.jpg'}
            />,
            <skoash.Image
                ref="bkg-image-2"
                className="hidden"
                src={ENVIRONMENT.MEDIA_GAME + 'ImageAssets/BKG_2.jpg'}
            />,
            <skoash.Image
                ref="bkg-image-3"
                className="hidden"
                src={ENVIRONMENT.MEDIA_GAME + 'ImageAssets/BKG_3.jpg'}
            />,
            <skoash.Image
                ref="bkg-image-4"
                className="hidden"
                src={ENVIRONMENT.MEDIA_GAME + 'ImageAssets/BKG_4.jpg'}
            />,
            <skoash.Image
                ref="bkg-image-5"
                className="hidden"
                src={ENVIRONMENT.MEDIA_GAME + 'ImageAssets/BKG_5.jpg'}
            />,
        ]}
    />
);

skoash.start(DroughtOut);
