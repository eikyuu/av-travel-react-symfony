import React, { Component } from "react";
import Banner from "../components/banner/Banner";
import Destinations from "../components/destinations/Destinations";
import Tours from "../components/tours/Tours";
import Player from "../components/player/Player";

const HomePage = (props) => {
  return (
    <>
      <Banner />
      <Destinations />
      <Tours />
      <Player />
    </>
  );
};

export default HomePage;
