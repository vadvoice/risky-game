import { useRef, useState } from 'react';
import soundtrack from '../assets/music/soundtrack.wav';
import classNames from 'classnames';

import './styles.scss';
import { MusicIcon } from '../assets/img/MusicIcon';

export default function GameSoundtrackController({
  actions: { onSoundTrackToggle },
}) {
  const [isPlaying, setIsPlaing] = useState(false);
  const audioRef = useRef();

  const onTriggerClick = (e) => {
    e.preventDefault();
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaing(!isPlaying);
    onSoundTrackToggle(!isPlaying);
  };

  const options = {
    playing:
      'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMiAyNHYtMjRsMjAgMTItMjAgMTJ6Ii8+PC9zdmc+',
    paused:
      'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMTAgMjRoLTZ2LTI0aDZ2MjR6bTEwLTI0aC02djI0aDZ2LTI0eiIvPjwvc3ZnPg==',
  };

  return (
    <div className="game-soundtrack">
      <audio ref={audioRef} src={soundtrack} loop />

      <button
        onClick={onTriggerClick}
        className={classNames('game-soundtrack__trigger-btn', {
          'game-soundtrack__trigger-btn--playing': isPlaying,
          'game-soundtrack__trigger-btn--pause': !isPlaying,
        })}
      >
        <MusicIcon />
        <img
          className="game-soundtrack__trigger-btn__img"
          src={options[isPlaying ? 'paused' : 'playing']}
        />
      </button>
    </div>
  );
}
