import { driver } from 'driver.js';
import 'driver.js/dist/driver.css';

const useDriverHook = () => {
  const isTutorialPassed = +localStorage.getItem('isTutorialPassed');

  const driverObj = driver({
    showProgress: false,
    showButtons: [],
    steps: [
      {
        element: '.scene',
        popover: {
          title: 'Welcome on the board',
          side: 'bottom',
        },
      },
      {
        element: '.game-soundtrack__trigger-btn',
        popover: {
          description: 'Game sound switch',
        },
      },
      {
        element: '.controls-panel',
        popover: {
          description: 'To kick the gears push this button',
          showButtons: false,
          side: 'top',
        },
      },
      {
        element: '.revolver-container',
        popover: {
          title: 'Try your luck and pull the trigger',
          showButtons: false,
          side: 'top',
        },
      },
      {
        element: '.controls-panel',
        popover: {
          title: 'But before stepping on a risky path',
          description:
            'Remember that you always have one attempt to spin the reel',
          showButtons: false,
          side: 'top',
        },
      },
      {
        element: '.scene',
        popover: {
          title: 'Good luck',
          side: 'over',
        },
      },
    ],
    onDestroyStarted: () => {
      if (!driverObj.hasNextStep() || confirm('Are you sure?')) {
        driverObj.destroy();
      }
    },
  });

  if (!isTutorialPassed) {
    driverObj.drive();
  }
  return driverObj;
};

export default useDriverHook;
