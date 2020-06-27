import React from "react";
import "./Opinion.css";
import quote from "./quote.svg";

const Opinion = () => {
  return (
    <section className="container mb-5 section_cards">
      <div className="cards">
        <img className="card_quote" src={quote} alt="" />
        <p className="card_opinion text-center">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea expedita
        </p>
        <div className="cards_user">
          <img
            className="card_user mb-2"
            src="https://randomuser.me/api/portraits/men/77.jpg"
            alt=""
          />
          <p className="card_name text-center">Eikyuu</p>
        </div>
      </div>

      <div className="cards">
        <img className="card_quote" src={quote} alt="" />
        <p className="card_opinion text-center">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea expedita
        </p>
        <div className="cards_user">
          <img
            className="card_user mb-2"
            src="https://randomuser.me/api/portraits/men/77.jpg"
            alt=""
          />
          <p className="card_name text-center">Eikyuu</p>
        </div>
      </div>

      <div className="cards">
        <img className="card_quote" src={quote} alt="" />
        <p className="card_opinion text-center">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea expedita
        </p>
        <div className="cards_user">
          <img
            className="card_user mb-2"
            src="https://randomuser.me/api/portraits/men/77.jpg"
            alt=""
          />
          <p className="card_name text-center">Eikyuu</p>
        </div>
      </div>
    </section>
  );
};

export default Opinion;
