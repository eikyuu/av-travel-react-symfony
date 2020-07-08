import React, { useState } from "react";
import { Link } from "react-router-dom";

const DestinationCards = (props) => {
  const [destinationState, setDestinationState] = useState(props);

  return (
    <div
      key={destinationState.id}
      className="col-sm-6 col-md-6 displayDestinations"
    >
      <Link
        style={{ textDecoration: "none", color: "white" }}
        to={"/destinations/" + destinationState.id}
      >
        <img className="destinations_img" alt="" src={destinationState.image} />
        <div className="destinations_city">
          <p className="destinations_city_p">
            {destinationState.pays} {destinationState.city}
          </p>
          <div className="mr-1 destinations_button">
            {destinationState.tours.length} tours
          </div>
        </div>
      </Link>
    </div>
  );
};

export default DestinationCards;
