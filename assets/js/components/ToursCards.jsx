import React from "react";
import { Link } from "react-router-dom";

const ToursCards = ({ id, image, title, description, days, price }) => {
  console.log(id);
  return (
    <Link
      style={{ textDecoration: "none", color: "black" }}
      to={"/tours/" + id}
      className="card"
    >
      <img src={image} className="card-img-top" alt="..." />
      <div className="m-3">
        <h5 className="tours_title">{title}</h5>
        <p className="card-text">{description}</p>
        <div className="div_price_days">
          <p className="card-text">{days} jours</p>
          <p className="card-text">{price}€</p>
        </div>
      </div>
    </Link>
  );
};

export default ToursCards;
