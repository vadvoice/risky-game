import anime from 'animejs';

/**
 * animations rules for animejs timeline
 */

// revolver
export const animeZoomOutRevolver = {
  targets: '.revolver',
  translateZ: -100,
  rotateY: 20,
  duration: 700,
};
export const animeZoomInRevolver = {
  targets: '.revolver',
  translateZ: 0,
  rotateY: 0,
  duration: 600,
};
export const animeOnGunShoot = {
  targets: '.revolver',
  rotateZ: [0, -20, 0],
  translateX: [0, -40, 0],
  translateY: [0, -30, 0],
  duration: 300,
};
export const animeGunLevitation = {
  targets: ['.revolver'],
  translateX: [0, -8, 9],
  translateY: [0, 4, -5],
  translateZ: [0, -14, 1],
  loop: true,
  direction: 'alternate',
  easing: 'easeInOutSine',
  duration: 5000,
};
export const animeGunSpin = {
  targets: '.revolver',
  translateZ: [0, -100],
  rotateY: [0, 20],
  rotateZ: [-360],
  duration: 500,
};
export const animeGunReload = {
  targets: '.revolver',
  translateZ: [-100, 0],
  rotateY: [20, 0],
  duration: 200,
};

// bullet
export const animateButtleFall = () => ({
  targets: '.bullet',
  translateX: [-1000, -50],
  translateY: [-1000, 800, 400, 300, 400],
  top: [-1000, 100],
  rotateZ: [10, 60, 30, 80, -20, 90, -110, 100],
  duration: 500,
  easing: 'easeOutQuad',
});
export const animateButtleGetIn = () => ({
  targets: '.bullet',
  translateY: [400, 100],
  rotateZ: [100, 380],
  opacity: [1, 0],
  duration: 200,
  easing: 'easeOutQuad',
});

// tutorial
export const animeHandHint = {
  targets: '.hand',
  translateX: [140, 80],
  translateY: [-20, 220],
  rotateZ: [0, -60],
  translateZ: [0, -100],
  easing: 'linear',
  loop: true,
  direction: 'alternate',
  duration: 1000,
};

// logo
export const animeLogoPreview = {
  targets: '.logo',
  translateY: 200,
  translateZ: [-2000, -200, 2000],
  easing: 'easeInOutBack',
  duration: 4500,
};

// reactstion
export const animeleftBottom = {
  targets: '.luckyHero',
  opacity: 1,
  bottom: [-300, -50],
  left: [-300, 30],
  rotateZ: 20,
  duration: 500,
  complete: () => {
    anime({
      targets: '.luckyHero',
      bottom: [-30, -500],
      left: [30, -300],
    });
  },
};
