import React from "react";
import "./Opinion.css";
import quote from "./quote.svg";

const Opinion = () => {
  return (
    <section className="container mb-5">
      <h1 className="destinations_h1">Avis des voyageurs</h1>
      <div className="section_cards mt-5">
        <div className="cards">
          <img className="card_quote" src={quote} alt="" />
          <p className="card_opinion text-center">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Consectetur cumque voluptates eligendi facere alias assumenda modi
            eius id blanditiis distinctio.
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
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Consectetur cumque voluptates eligendi facere alias assumenda modi
            eius id blanditiis distinctio.
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
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Consectetur cumque voluptates eligendi facere alias assumenda modi
            eius id blanditiis distinctio.
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
      </div>
    </section>
  );
};

export default Opinion;
