import React, { useState } from "react";
import { Link } from "react-router-dom";

const DestinationCards = ({ id, image, city, tours, pays }) => {
  return (
    <div key={id} className="col-sm-6 col-md-6 displayDestinations">
      <Link
        style={{ textDecoration: "none", color: "white" }}
        to={"/destinations/" + id}
      >
        <img className="destinations_img" alt="" src={image} />
        <div className="destinations_city">
          <p className="destinations_city_p">
            {pays} {city}
          </p>
          <div className="mr-1 destinations_button">{tours.length} tours</div>
        </div>
      </Link>
    </div>
  );
};

export default DestinationCards;
