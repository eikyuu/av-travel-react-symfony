import React from "react";
import ReactPlayer from "react-player";
import "./Player.css";
const Player = (props) => {
  return (
    <section className="player-react mb-5">
      <ReactPlayer
        light={true}
        width="100%"
        height="100%"
        url="https://www.youtube.com/watch?v=q1095iL7tQM"
      />
    </section>
  );
};

export default Player;
