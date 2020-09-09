import React from "react";
import "./Opinion.css";
import quote from "./quote.svg";

const Opinion = () => {
  return (
    <section className="container mb-5">
      <h1 className="destinations_h1">Avis des voyageurs</h1>
      <div className="section_cards mt-5">
        <div className="cards">
          <img className="card_quote" src={quote} alt="profil utilisateur" />
          <p className="card_opinion text-center">
            SUPER VOYAGE SUPER ORGA MEME 2 femmes seules on se sent accompagnées
            des vacances sans les soucis juste à se mettre en mode vacances et
            tout déroule tout simplement
          </p>
          <div className="cards_user">
            <img
              className="card_user mb-2"
              src="https://randomuser.me/api/portraits/women/77.jpg"
              alt=""
            />
            <p className="card_name text-center">Sabrina</p>
          </div>
        </div>

        <div className="cards">
          <img className="card_quote" src={quote} alt="profil utilisateur" />
          <p className="card_opinion text-center">
            Ce petit voyage à Milan et aux lacs fut en tous points une réussite
            et les prestations de Voyageurs du Monde impeccables.
          </p>
          <div className="cards_user">
            <img
              className="card_user mb-2"
              src="https://randomuser.me/api/portraits/men/78.jpg"
              alt=""
            />
            <p className="card_name text-center">Didier</p>
          </div>
        </div>

        <div className="cards">
          <img className="card_quote" src={quote} alt="profil utilisateur" />
          <p className="card_opinion text-center">
            Une respiration dans cette période de pandémie grâce au
            professionnalisme et à la réactivité des équipes. Une sérénité
            retrouvée grâce au choix pointu des hébergements intimistes et hors
            les murs. Merci à toute l’équipe
          </p>
          <div className="cards_user">
            <img
              className="card_user mb-2"
              src="https://randomuser.me/api/portraits/men/57.jpg"
              alt=""
            />
            <p className="card_name text-center">Quentin</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Opinion;
