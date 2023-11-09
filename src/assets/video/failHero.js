import * as React from "react";
import videoHero from "./owch.mp4";

export const FailHeroVideo = ({ muted }) => {
  return (
    <video
      style={{
        position: "fixed",
        right: 0,
        bottom: 0,
        minWidth: "100%",
        minHeight: "100%"
      }}
      autoPlay
      muted={muted}
      id="myVideo"
    >
      <source src={videoHero} type="video/mp4" />
      Your browser does not support HTML5 video.
    </video>
  );
};
