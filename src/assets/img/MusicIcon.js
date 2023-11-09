import * as React from 'react';
import img from './music.svg';

export const MusicIcon = () => {
  return (
    <img
      alt="Music"
      src={img}
      style={{
        width: '1rem',
        height: '1rem',
        maxWidth: '1rem',
      }}
    />
  );
};
