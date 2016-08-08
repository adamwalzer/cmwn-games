import TargetSelectable from 'shared/components/target_selectable/0.1';
import Carousel from 'shared/components/carousel/0.1';
import Randomizer from 'shared/components/randomizer/0.1';
import Score from 'shared/components/score/0.1';
import Reveal from 'shared/components/reveal/0.1';

export default function (props, ref, key) {
  var CarouselScreen = (
    <skoash.Screen
      {...props}
      ref={ref}
      key={key}
      id="carousel"
    >
      <skoash.Audio ref="correct" type="sfx" src="media/S_10/S_10.3.mp3" />
      <skoash.Audio ref="incorrect" type="sfx" src="media/S_10/S_10.4.mp3" />
      <skoash.Image className="hidden viewport" src="media/S_10/img_10.3.png" />
      <skoash.Image className="hidden target" src="media/S_10/img_10.8.png" />
      <skoash.Image className="hidden score" src="media/S_10/img_10.9.png" />
      <skoash.Image className="hidden reveal" src="media/_Frame/Fr_3.png" />
      <skoash.Component className="group">
        <TargetSelectable
          selectable={
            <Carousel
              className="slide"
              delay={400}
              bin={
                <Randomizer
                  bin={[
                    <div ref="loops" message="loops" pl-bg="media/S_10/img_10.4.png"></div>,
                    <div ref="whorl" message="whorl" pl-bg="media/S_10/img_10.5.png"></div>,
                    <div ref="arch" message="arch" pl-bg="media/S_10/img_10.6.png"></div>,
                    <div ref="doubleloops" message="doubleloops" pl-bg="media/S_10/img_10.7.png"></div>,
                  ]}
                />
              }
            />
          }
          targets={[
            <skoash.Image ref="loops" amount={2} className="animated" src="media/S_10/img_10.11.png" />,
            <skoash.Image ref="whorl" amount={3} className="animated" src="media/S_10/img_10.15.png" />,
            <skoash.Image ref="arch" amount={3} className="animated" src="media/S_10/img_10.18.png" />,
            <skoash.Image ref="doubleloops" amount={2} className="animated" src="media/S_10/img_10.20.png" />,
            <skoash.Image ref="whorl" amount={2} className="animated" src="media/S_10/img_10.14.png" />,
            <skoash.Image ref="doubleloops" amount={3} className="animated" src="media/S_10/img_10.21.png" />,
            <skoash.Image ref="arch" amount={2} className="animated" src="media/S_10/img_10.17.png" />,
            <skoash.Image ref="loops" amount={3} className="animated" src="media/S_10/img_10.12.png" />,
          ]}
        />
        <Score completeDelay={1000}>
          <div />
          <div />
          <div />
        </Score>
      </skoash.Component>
      <Reveal
        openOnStart="8"
        assets={[
          <skoash.Audio type="voiceOver" src="media/S_10/VO_10.3.mp3" />,
          <skoash.Audio type="voiceOver" src="media/S_10/VO_10.5.mp3" />,
          <skoash.Audio type="voiceOver" src="media/S_10/VO_10.4.mp3" />,
          <skoash.Audio type="voiceOver" src="media/S_10/VO_10.6.mp3" />,
          <skoash.Audio type="voiceOver" src="media/S_10/VO_10.7.mp3" />,
          <skoash.Audio type="voiceOver" src="media/S_10/VO_10.8.mp3" />,
          <skoash.Audio type="voiceOver" src="media/S_10/VO_10.9.mp3" />,
          <skoash.Audio type="voiceOver" src="media/S_10/VO_10.10.mp3" />,
          <skoash.Audio type="voiceOver" src="media/S_10/VO_10.1.mp3" />,
        ]}
        list={[
          <li>
            No two fingerprints<br/>
            are the same!
          </li>,
          <li>
            The chance of having the same<br/>
            fingerprint as someone else<br/>
            is 1 in 64 billion.
          </li>,
          <li>
            Fingerprints are more<br/>
            unique than DNA.
          </li>,
          <li>
            Fingerprinting is part of the<br/>
            science of biometrics which uses<br/>
            physical characteristics<br/>
            as identifiers.
          </li>,
          <li>
            The ridges that make up<br/>
            fingerprints are called<br/>
            friction ridges.
          </li>,
          <li>
            Your fingerprints never change.
          </li>,
          <li>
            Your fingertips contain pores<br/>
            that attach to sweat glands.<br/>
            The sweat is what causes you<br/>
            to leave prints on the<br/>
            things you touch.
          </li>,
          <li>
            Fingerprinting is a technique<br/>
            know as dactyloscopy.
          </li>,
          <li>
            <p className="typing">CLICK WHEN THE PRINT</p>
            <p className="typing">MATCHES THE DESCRIPTION</p>
            <p className="typing">AND GET A COOL FACT!</p>
          </li>,
        ]}
      />
    </skoash.Screen>
  );

  return CarouselScreen;
}
