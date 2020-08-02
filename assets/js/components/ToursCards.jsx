import React from "react";
import { Link } from "react-router-dom";
import Truncate from "react-truncate";

const ToursCards = ({ id, image, title, description, days, price }) => {
  return (
    <Link
      style={{ textDecoration: "none", color: "black" }}
      to={"/tours/" + id}
      className="card"
    >
      <img src={image} className="card-img-top" alt="..." />
      <div className="m-3">
        <h5 className="tours_title mb-5">{title}</h5>
        <Truncate lines={3} ellipsis={<span>...</span>}>
          {description}
        </Truncate>
        <div className="div_price_days mt-5">
          <p className="card-text">{days} jours</p>
          <p className="card-text">{price}€</p>
        </div>
      </div>
    </Link>
  );
};

export default ToursCards;
