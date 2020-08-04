import React, { useEffect, useState, useContext } from "react";
import { toast } from "react-toastify";
import toursApi from "../../services/toursApi";
import JwtDecode from "jwt-decode";
import bookingApi from "../../services/bookingApi";
import authContext from "../../contexts/authContext";
import ReactDatePicker from "react-datepicker";
import "./DetailTours.css";

import "react-datepicker/dist/react-datepicker.css";

const DetailTours = ({ match, history }) => {
  const { id } = match.params;
  const { isAuthenticated, setIsAuthenticated } = useContext(authContext);
  const [tours, setTours] = useState({});

  const findUser = () => {
    let result;
    if (isAuthenticated) {
      const token = window.localStorage.getItem("authToken");
      const { idUserToken } = JwtDecode(token);
      result = idUserToken;
    }
    return result;
  };
  const userId = findUser();

  const [booking, setBooking] = useState({
    user: "/api/users/" + userId,
    tours: "/api/tours/" + Number(id),
    date: new Date(),
    status: "en cours",
  });

  console.log(userId);

  const fetchTours = async (id) => {
    try {
      const data = await toursApi.find(id);
      setTours(data);
    } catch (error) {
      toast.error("Le tours n'a pas pu être chargé");
      props.history.replace("/admin/tours");
    }
  };

  useEffect(() => {
    fetchTours(id);
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await bookingApi.create(booking);
      toast.success("La reservation a bien etait effectuer");
      history.replace("/");
    } catch ({ response }) {
      toast.error("Des erreurs dans votre formulaire !");
    }
  };

  const handleChange = (selected) => {
    setBooking({ ...booking, date: selected });
  };

  return (
    <div className="container detailTours_container">
      <div className="row">
        <h1 className="col-12 mb-3">{tours.title}</h1>
        <img src={tours.image} className="col-12" alt="" />
        <p className="col-12 mt-3">{tours.description}</p>
        <p className="col-6">{tours.days} jours </p>
        <p className="col-6">{tours.price} € </p>
        <h3 className="col-12">Les destinations que vous allez decouvrir</h3>
        {tours.destinations &&
          tours.destinations.map((destination) => (
            <div key={destination.id} className="mt-3 col-12">
              <p>{destination.city}</p>
            </div>
          ))}
      </div>
      <form className="row" onSubmit={handleSubmit}>
        <p className="col-12">Choisisez date de votre depart</p>
        <ReactDatePicker selected={booking.date} onChange={handleChange} />
        <button
          type="submit"
          className="btn btn-success"
          disabled={!isAuthenticated}
        >
          Reserver le tours
        </button>
      </form>
    </div>
  );
};

export default DetailTours;
