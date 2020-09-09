import React from "react";
import "./Banner.css";

const Banner = () => {
  return (
    <section className="container-fluid banner_home">
      <div className="row banner_home_div">
        <h1 className="banner_home_h1 col-12 text-white">
          Trouver votre prochaine destination.
        </h1>
        <p className="banner_home_h2 col-12 text-white">
          Venez découvrir des lieux incroyables avec des offres exclusives.
        </p>
      </div>
    </section>
  );
};

export default Banner;
