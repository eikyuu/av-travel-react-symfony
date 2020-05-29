import React, { Component } from "react";
import Banner from "../components/Banner";
import SearchBar from "../components/SearchBar";
import Destinations from "../components/Destinations";

const HomePage = props => {
  return (
    <>
      <Banner />
      <SearchBar />
      <Destinations />
    </>
  );
};

export default HomePage;
