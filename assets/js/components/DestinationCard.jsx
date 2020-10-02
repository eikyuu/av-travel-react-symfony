import React from "react";
import { Link } from "react-router-dom";

const DestinationCard = ({ id, image, city, tours, pays }) => {
  return (
    <Link to={"/destination/" + id}>
      <img
        className="destinationCard_img"
        alt="image d'une destination"
        src={image}
      />
      <div className="destinationCard_div">
        <p className="destinationCard_p">
          {pays} {city}
        </p>
        <div className="destinationCard_button mr-1 ">
          {tours.length} croisières
        </div>
      </div>
    </Link>
  );
};

export default DestinationCard;
