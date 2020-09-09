import React, { Suspense, lazy } from "react";
const Banner = lazy(() => import("../components/banner/Banner"));
const Destinations = lazy(() =>
  import("../components/destinations/Destinations")
);
const Tours = lazy(() => import("../components/tours/Tours"));
const Player = lazy(() => import("../components/player/Player"));
const Opinion = lazy(() => import("../components/opinion/Opinion"));
const Contact = lazy(() => import("../components/contact/contact"));

const HomePage = () => {
  return (
    <>
      <Suspense fallback={<div>Chargement...</div>}>
        <Banner />
        <Destinations />
        <Tours />
        <Player />
        <Opinion />
        <Contact />
      </Suspense>
    </>
  );
};

export default HomePage;
