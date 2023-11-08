import gunRealod from "../assets/music/gunRealod.mp3";
import gunReady from "../assets/music/gunReady.mp3";
import emptyBullet from "../assets/music/emptyBullet.mp3";
import gunShoot from "../assets/music/gunShoot.mp3";
import gunEmptyShoot from "../assets/music/gunEmptyShoot.mp3";
import soundtrack from "../assets/music/soundtrack.wav";

/* constructor */
const audioInstance = (source) => {
  const audio = new Audio(source);
  audio.preload = true;
  return audio;
};

/* tracks */
export const soundGameSoundtrack = () => {
  const audio = new Audio(soundtrack);
  audio.loop = true;
  return audio;
};
export const soundIsOver = () => {
  const audio = audioInstance(
    "https://s3-us-west-2.amazonaws.com/s.cdpn.io/4273/gonna-make-you-sweat.mp3"
  );
  audio.play();
};

export const soundGunReload = (() => {
  const audio = audioInstance(gunRealod);
  return audio;
})();

export const soundGunGetReady = (() => {
  const audio = audioInstance(gunReady);
  return audio;
})();

export const soundEmptyBullet = (() => {
  const audio = audioInstance(emptyBullet);
  return audio;
})();

export const soundBang = (() => {
  const audio = audioInstance(gunShoot);
  audio.play();
  return audio;
})();

export const soundEmptyGunshoot = (() => {
  const audio = audioInstance(gunEmptyShoot);
  return audio;
})();
