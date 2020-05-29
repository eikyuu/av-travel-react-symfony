import React, { Component } from "react";
import Banner from "../components/Banner";
import SearchBar from "../components/SearchBar";
import Destinations from "../components/Destinations";
import Tours from "../components/Tours";
import Player from "../components/Player";

const HomePage = props => {
  return (
    <>
      <Banner />
      <SearchBar />
      <Destinations />
      <Tours />
      <Player />
    </>
  );
};

export default HomePage;
