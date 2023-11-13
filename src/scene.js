import * as React from 'react';
import { Revolver } from './revolver/revolver';
import anime from 'animejs';
import { Button } from './button/button';
import { BigButton } from './bigButton/bigButton';
import { Bullet } from './bullet/bullet';
import {
  soundBang,
  soundEmptyBullet,
  soundEmptyGunshoot,
  soundGunReload,
  soundGunGetReady,
} from './player/playSource';
import {
  animeZoomOutRevolver,
  animeZoomInRevolver,
  animeOnGunShoot,
  animeGunLevitation,
  animeGunSpin,
  animeGunReload,
  animateButtleFall,
  animateButtleGetIn,
  animeHandHint,
  animeleftBottom,
} from './animations';
import { Hand } from './assets/hand';
import { LuckyHero } from './assets/img/luckyHero';
import { FailHeroVideo } from './assets/video/failHero';
import { useSeoHook } from './hooks/seoHook';
import GameSoundtrackController from './gameSoundTrack';
import useDriverHook from './hooks/useDriver';

const Scene = () => {
  useSeoHook({ title: ['Risky Revolver', 'Take your risk'] });
  const initialGameState = {
    revolverClasses: ['revolver'],
    isGameStarted: false,
    isAnimating: false,
    isGameOver: false,
    bullet: 0,
    numberOfShots: 0,
    shotCounter: 0,
    bulletPosition: 0,
    refreshAttempt: 1,
    isTutorialPassed: +localStorage.getItem('isTutorialPassed'),
    isSoundEnabled: false,
    // development mode
    isDevMode: false,
  };
  const [gameState, setGameState] = React.useState(initialGameState);
  const [gunLevitation, setGunLevitation] = React.useState();
  const {
    bullet,
    bulletPosition,
    isAnimating,
    isGameOver,
    isGameStarted,
    numberOfShots,
    revolverClasses,
    shotCounter,
    refreshAttempt,
    isTutorialPassed,
    isSoundEnabled,
    isDevMode,
  } = gameState;
  const appDriver = React.useMemo(() => useDriverHook(), []);

  const getRandomPosition = (min = 0, max = 6) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  // anime timeline
  const tl = anime.timeline({
    easing: 'easeOutExpo',
  });

  const luckyReaction = () => {
    anime(animeleftBottom);
  };

  const onSoundTrackToggle = (value) => {
    setGameState({
      ...gameState,
      isSoundEnabled: value,
    });
  };

  const onGunActivate = () => {
    setGameState({
      ...gameState,
      isGameStarted: true,
      isAnimating: true,
      isTutorialPassed: 1,
    });
    localStorage.setItem('isTutorialPassed', 1);
    if (appDriver.isActive()) {
      appDriver.moveNext();
    }
  };

  const initGame = () => {
    setGameState({
      ...initialGameState,
      bullet: 0,
      bulletPosition: getRandomPosition(),
      isGameStarted: true,
      isAnimating: false,
      revolverClasses: ['revolver', 'active'],
      isTutorialPassed: localStorage.getItem('isTutorialPassed'),
      isSoundEnabled: gameState.isSoundEnabled,
    });
  };

  const gameOver = () => {
    // pause levitation
    if (gunLevitation) {
      gunLevitation.pause();
    }
    // reset levitation state
    setGunLevitation(null);
    setGameState({
      ...initialGameState,
      numberOfShots,
      isGameOver: true,
      revolverClasses: ['revolver', 'exploded'],
      isSoundEnabled: gameState.isSoundEnabled,
    });
  };

  const onRevolverClick = () => {
    if (appDriver.isActive()) {
      appDriver.moveNext();
      return;
    }
    if (isGameStarted && !isAnimating && revolverClasses.includes('active')) {
      // SHOOT
      anime(animeOnGunShoot);

      if (shotCounter + 1 === bulletPosition || bulletPosition === 0) {
        if (isSoundEnabled) {
          soundBang.play();
        }
        gameOver();
      } else {
        if (isSoundEnabled) {
          soundEmptyGunshoot.play();
        }
        luckyReaction();
        setGameState({
          ...gameState,
          numberOfShots: numberOfShots + 1,
          shotCounter: shotCounter + 1,
          refreshAttempt: 1,
        });
      }
    }
  };

  const onRevolverRefresh = () => {
    if (isSoundEnabled) {
      soundGunReload.play();
    }
    setGameState({
      ...gameState,
      revolverClasses: ['revolver'],
    });
    tl.add(animeGunSpin).add({
      ...animeGunReload,
      complete: () => {
        setGameState({
          ...gameState,
          revolverClasses: ['revolver', 'active'],
          bulletPosition: getRandomPosition(),
          refreshAttempt: 0,
          shotCounter: 0,
        });
      },
    });
    if (appDriver.isActive()) {
      appDriver.moveNext();
    }
  };

  React.useEffect(() => {
    if (isGameStarted) {
      const path = anime.path('.bullet-path path');
      tl.add({
        ...animeZoomOutRevolver,
        complete: () => {
          if (isSoundEnabled) {
            soundEmptyBullet.play();
          }
        },
      })
        .add({
          ...animateButtleFall(),
        })
        .add({
          ...animateButtleGetIn(),
          complete: () => {
            if (isSoundEnabled) {
              soundGunGetReady.play();
            }
          },
        })
        .add({
          ...animeZoomInRevolver,
          complete: () => {
            initGame();
            setGunLevitation(anime(animeGunLevitation));
          },
        });
    } else {
      setGameState({
        ...gameState,
        bullet: true,
      });
    }
  }, [isGameStarted]);

  React.useEffect(() => {
    if (isTutorialPassed) {
      anime(animeHandHint);
    }
  }, [isTutorialPassed]);
  React.useEffect(() => {
    anime({
      targets: '.shoots-counter',
      scale: [1, 1.2, 1],
    });
  }, [numberOfShots]);

  return (
    <>
      <div className={isGameOver ? 'scene game-over' : 'scene'}>
        <LuckyHero />
        {isGameOver && !isAnimating ? (
          <FailHeroVideo muted={!isSoundEnabled} />
        ) : null}
        {isTutorialPassed && !isGameStarted ? (
          <>
            <Hand />
          </>
        ) : null}

        <header className="scene__header">
          <h4 className="shoots-counter">
            {numberOfShots ? `Attempts: ` : ''}
            {numberOfShots ? <strong>{numberOfShots}</strong> : null}
          </h4>

          {isDevMode ? (
            <>
              <h3>Bullet position: {bulletPosition}</h3>
              <h3>shotCounter: {shotCounter}</h3>
              {!isAnimating && <Button onClick={gameOver}>stop game</Button>}
            </>
          ) : null}
          <GameSoundtrackController
            actions={{ onSoundTrackToggle }}
            data={{ isSoundEnabled }}
          />
        </header>
        <div className={'revolver-container'}>
          <Revolver
            onClick={onRevolverClick}
            className={revolverClasses.join(' ')}
          />
          {isGameOver && !isAnimating ? (
            <>
              <h3 className="shoots-counter big">Score: {numberOfShots}</h3>
              <p className="revolver-container__desc">minus one... not your day</p>
            </>
          ) : null}
          {isGameStarted && bullet ? <Bullet className={`bullet`} /> : null}
        </div>
        <div className="controls-panel">
          {!isGameStarted && (
            <Button onClick={onGunActivate}>get shit done</Button>
          )}
          {isGameStarted && !isAnimating ? (
            <BigButton disabled={!refreshAttempt} onClick={onRevolverRefresh}>
              reload
            </BigButton>
          ) : null}
        </div>
        <footer
          className="scene__footer"
          onClick={() =>
            window.open('https://github.com/vadvoice', '_blank').focus()
          }
        >
          <img
            alt="author"
            src="https://avatars.githubusercontent.com/u/17790034?v=4"
            width={20}
            height={20}
          />
          <strong>© Vadym Shevchenko</strong>
        </footer>
      </div>
    </>
  );
};

export { Scene };
