import Selectable from 'shared/components/selectable/0.1';
import Reveal from 'shared/components/reveal/0.1';
import MediaCollection from 'shared/components/media_collection/0.1';

export default function (props, ref, key) {
  var nextPhoto;

  const jobs = [
    'designer',
    'architect',
    'surgeon',
    'engineer',
    'dentist',
    'artist',
  ];

  nextPhoto = function () {
    skoash.trigger('updateState', {
      path: 'selectable',
      data: {
        select: jobs[(jobs.indexOf(_.get(props, 'data.selectable.target.props.data-ref')) + 1) % jobs.length]
      }
    });
  };

  return (
    <skoash.Screen
      {...props}
      ref={ref}
      key={key}
      id="help-the-world"
    >
      <skoash.Image
        className="hidden"
        src={ENVIRONMENT.MEDIA + 'SpritesAnimations/sprite.minion.png'}
      />
      <skoash.Image
        className="hidden"
        src={ENVIRONMENT.MEDIA + 'SpritesAnimations/sprite.realworldgallery.png'}
      />
      <skoash.Audio
        type="voiceOver"
        src={ENVIRONMENT.MEDIA + 'SoundAssets/vos/VO_and_many.mp3'}
      />
      <MediaCollection
        play={_.get(props, 'data.reveal.open')}
      >
        <skoash.Audio
          type="voiceOver"
          ref={jobs[0]}
          src={ENVIRONMENT.MEDIA + 'SoundAssets/vos/VO_Product_Designers.mp3'}
        />
        <skoash.Audio
          type="voiceOver"
          ref={jobs[1]}
          src={ENVIRONMENT.MEDIA + 'SoundAssets/vos/VO_Architects.mp3'}
        />
        <skoash.Audio
          type="voiceOver"
          ref={jobs[2]}
          src={ENVIRONMENT.MEDIA + 'SoundAssets/vos/VO_Surgeons.mp3'}
        />
        <skoash.Audio
          type="voiceOver"
          ref={jobs[3]}
          src={ENVIRONMENT.MEDIA + 'SoundAssets/vos/VO_Engineers.mp3'}
        />
        <skoash.Audio
          type="voiceOver"
          ref={jobs[4]}
          src={ENVIRONMENT.MEDIA + 'SoundAssets/vos/VO_Dentists.mp3'}
        />
        <skoash.Audio
          type="voiceOver"
          ref={jobs[5]}
          src={ENVIRONMENT.MEDIA + 'SoundAssets/vos/VO_Artists.mp3'}
        />
      </MediaCollection>
      <div className="header">
        …and many ways to help the world<br/>
        with the wonderful things you create!<br/>
        Click on the image to expand.
      </div>
      <Selectable
        dataTarget="selectable"
        selectClass="HIGHLIGHTED"
        select={_.get(props, 'data.selectable.select')}
        list={[
          <skoash.Component
            type="li"
            data-ref={jobs[0]}
          />,
          <skoash.Component
            type="li"
            data-ref={jobs[1]}
          />,
          <skoash.Component
            type="li"
            data-ref={jobs[2]}
          />,
          <skoash.Component
            type="li"
            data-ref={jobs[3]}
          />,
          <skoash.Component
            type="li"
            data-ref={jobs[4]}
          />,
          <skoash.Component
            type="li"
            data-ref={jobs[5]}
          />,
        ]}
      />
      <Reveal
        openTarget="reveal"
        openReveal={_.get(props, 'data.selectable.target.props.data-ref')}
        list={[
          <skoash.Component
            type="li"
            data-ref={jobs[0]}
          >
            <h3>
              Product designers
            </h3>
            <div>
              design and print useful objects for others!
            </div>
            <button className="next-photo" onClick={nextPhoto} />
          </skoash.Component>,
          <skoash.Component
            type="li"
            data-ref={jobs[1]}
          >
            <h3>
              Architects
            </h3>
            <div>
              create plans for housing that will<br/>
              be 3D printed!
            </div>
            <button className="next-photo" onClick={nextPhoto} />
          </skoash.Component>,
          <skoash.Component
            type="li"
            data-ref={jobs[2]}
          >
            <h3>
              Surgeon
            </h3>
            <div>
              turn x-rays into 3D models<br/>
              and repair injured body parts!
            </div>
            <button className="next-photo" onClick={nextPhoto} />
          </skoash.Component>,
          <skoash.Component
            type="li"
            data-ref={jobs[3]}
          >
            <h3>
              Engineers
            </h3>
            <div>
              make 3D models of you creations,<br/>
              and then print the real thing!
            </div>
            <button className="next-photo" onClick={nextPhoto} />
          </skoash.Component>,
          <skoash.Component
            type="li"
            data-ref={jobs[4]}
          >
            <h3>
              Dentists
            </h3>
            <div>
              print replacement teeth for your patients!
            </div>
            <button className="next-photo" onClick={nextPhoto} />
          </skoash.Component>,
          <skoash.Component
            type="li"
            data-ref={jobs[5]}
          >
            <h3>
              Artists
            </h3>
            <div>
              express themselves through the magic<br/>
              of 3D printing!
            </div>
            <button className="next-photo" onClick={nextPhoto} />
          </skoash.Component>,
        ]}
      />
    </skoash.Screen>
  );
}
