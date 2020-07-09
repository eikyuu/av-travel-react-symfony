import React from "react";
import Banner from "../components/banner/Banner";
import Destinations from "../components/destinations/Destinations";
import Tours from "../components/tours/Tours";
import Player from "../components/player/Player";
import Opinion from "../components/opinion/Opinion";
import Contact from "../components/contact/contact";

const HomePage = () => {
  return (
    <>
      <Banner />
      <Destinations />
      <Tours />
      <Player />
      <Opinion />
      <Contact />
    </>
  );
};

export default HomePage;
