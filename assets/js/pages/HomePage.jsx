import React, { Component } from "react";
import Banner from "../components/banner/Banner";
import SearchBar from "../components/searchbar/SearchBar";
import Destinations from "../components/destinations/Destinations";
import Tours from "../components/tours/Tours";
import Player from "../components/player/Player";

const HomePage = (props) => {
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
