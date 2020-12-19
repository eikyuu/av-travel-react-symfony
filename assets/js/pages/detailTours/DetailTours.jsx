import React, { useEffect, useState, useContext, lazy } from "react";
import { toast } from "react-toastify";
import toursApi from "../../services/toursApi";
import JwtDecode from "jwt-decode";
import bookingApi from "../../services/bookingApi";
import authContext from "../../contexts/authContext";
import ReactDatePicker from "react-datepicker";
import "./DetailTours.css";
const ImageGrid = lazy(() => import("../../components/loaders/ImageGrid"));

import "react-datepicker/dist/react-datepicker.css";
import ErrorBoundary from "../../components/ErrorBoundary";

const DetailTours = ({ match, history }) => {
  const { id } = match.params;
  const { isAuthenticated, setIsAuthenticated } = useContext(authContext);
  const [tours, setTours] = useState({});
  const [loading, setLoading] = useState(true);

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

  const fetchTours = async (id) => {
    try {
      const data = await toursApi.find(id);
      setTours(data);
      setLoading(false);
    } catch (error) {
      toast.error("Le tours n'a pas pu être chargé");
      props.history.replace("/profile");
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
      history.replace("/profile/" + userId);
    } catch ({ response }) {
      toast.error("Des erreurs dans votre formulaire !");
    }
  };

  const handleChange = (selected) => {
    setBooking({ ...booking, date: selected });
  };

  return (
    <ErrorBoundary>
      <section className="container mb-5 detailTours_container">
        {!loading && (
          <div className="row">
            <h1 className="DetailTours_h1 col-12 mb-3">{tours.title}</h1>
            <img
              src={tours.image}
              className="col-sm-12 col-xl-6"
              alt="image tours"
            />
            <p className="col-sm-12 col-xl-6">{tours.description}</p>
            <p className="col-6">
              {tours.days} jours {tours.price} €{" "}
            </p>
            <p className="col-12 font-weight-bold">
              Les destinations que vous allez decouvrir
            </p>
            {tours.destinations &&
              tours.destinations.map((destination) => (
                <div key={destination.id} className="mt-3 col-12">
                  <p className="font-weight-bold">{destination.city}</p>
                  <p>{destination.title}</p>
                  <p>{destination.description}</p>
                </div>
              ))}
          </div>
        )}
        {loading && <ImageGrid />}

        <form className="row" onSubmit={handleSubmit}>
          <p className="col-12 font-weight-bold">
            Choisissez la date de votre départ
          </p>
          <ReactDatePicker
            className="detailTours_dateTime ml-3"
            selected={booking.date}
            onChange={handleChange}
          />
          <button
            type="submit"
            className="btn btn-success ml-3"
            disabled={!isAuthenticated}
          >
            Ajouter a mes réservations
          </button>
        </form>
      </section>
    </ErrorBoundary>
  );
};

export default DetailTours;
