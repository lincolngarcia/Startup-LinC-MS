import React from 'react';
import { delay } from './delay';

export const SimonButton = React.forwardRef(({ position, onPressed }, ref) => {
  const [lightOn, setLightOn] = React.useState(true);
  
  // Use "React Refs" to allow the parent to reach into the button component
  // and simulate a button press. This is necessary to play the sequence that
  // the player must copy.
  React.useImperativeHandle(ref, () => ({
    async press(delayMs = 500, playSound = true) {
      setLightOn(false);
      if (playSound) {
        const sound = document.querySelector(`#${position}`);
        sound.play();
      }
      await delay(delayMs);
      setLightOn(true);
      await delay(100);
    },
  }));

  return (
    <>
      <audio id={position} src={`/${position}.mp3`}></audio>
      <button
        id={position}
        className={`game-button ${position} ${lightOn ? 'light-on' : ''}`}
        onClick={() => onPressed(position)}
      ></button>
    </>
  );
});
