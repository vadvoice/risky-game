import { useEffect } from 'react';

export function useSeoHook(data = {}) {
  data.title = data.title || 'Risky Revolver';

  useEffect(() => {
    let titleIndex = 0;
    const titleInterval = setInterval(() => {
      document.title = data.title[titleIndex % data.title.length];
      titleIndex++;
    }, 2000); // change title every 1 second

    return () => {
      clearInterval(titleInterval); // clean up on component unmount
    };
  }, [data.title]);
}
