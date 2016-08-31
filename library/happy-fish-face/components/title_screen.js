export default function (props, ref, key) {
  return (
    <skoash.Screen
      {...props}
      ref={ref}
      key={key}
      id="title"
      className="screen"
      checkComplete={false}
      completeDelay={2000}
      completeOnStart
    >
      <skoash.Image ref="background" className="fish animated" src="media/_images/_title/img_1.1.png" />
      <skoash.Image ref="title" className="title animated" src="media/_images/_title/img_1.2.png" />
      <div ref="bubbles" className="bubbles">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </skoash.Screen>
  );
}
