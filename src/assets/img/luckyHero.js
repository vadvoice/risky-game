import * as React from "react";
import hero from "./seriously.png";

export const LuckyHero = () => {
  return (
    <img
      className="luckyHero"
      alt="here"
      src={hero}
      style={{
        width: "40vw",
        maxWidth: "200px",
        opacity: 0,
        position: "absolute"
      }}
    />
  );
};
