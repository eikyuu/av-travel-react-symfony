import React from "react";

const ToursCards = ({ image, title, description, days, price }) => {
  return (
    <a
      style={{ textDecoration: "none", color: "black" }}
      href="http://google.com"
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
    </a>
  );
};

export default ToursCards;
