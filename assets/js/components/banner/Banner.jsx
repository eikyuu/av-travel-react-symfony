import React from "react";
import "./Banner.css";

const Banner = () => {
  return (
    <div className="container-fluid banner_home">
      <div className="row banner_home_div">
        <h1 className="banner_home_h1 col-12 text-white">
          Trouver votre prochaine destination.
        </h1>
        <h2 className="banner_home_h2 col-12 text-white">
          Venez découvrir des lieux incroyables avec des offres exclusives.
        </h2>
      </div>
    </div>
  );
};

export default Banner;
