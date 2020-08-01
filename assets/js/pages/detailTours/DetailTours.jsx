import React, { useEffect, useState, useContext } from "react";
import { toast } from "react-toastify";
import toursApi from "../../services/toursApi";
import JwtDecode from "jwt-decode";
import bookingApi from "../../services/bookingApi";
import authContext from "../../contexts/authContext";
import ReactDatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const DetailTours = ({ match, history }) => {
  const { id } = match.params;
  const { isAuthenticated, setIsAuthenticated } = useContext(authContext);
  const [tours, setTours] = useState({});
  const [booking, setBooking] = useState({
    user: "/api/users/" + 107,
    tours: "/api/tours/" + Number(id),
    date: new Date(),
    status: "en cours",
  });

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

  console.log(booking.status);
  return (
    <div className="container mt-5">
      <h1>{tours.title}</h1>
      <p>{tours.description}</p>
      <p>{tours.days}</p>
      <p>{tours.price}</p>
      <img src={tours.image} className="col-6" alt="" />
      {tours.destinations &&
        tours.destinations.map((destination) => (
          <div key={destination.id} className="mt-3 col-sm-6 col-md-4">
            <h1>{destination.title}</h1>
          </div>
        ))}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <button
            type="submit"
            className="btn btn-success"
            disabled={!isAuthenticated}
          >
            Reserver le tours
          </button>
          <ReactDatePicker selected={booking.date} onChange={handleChange} />
        </div>
      </form>
    </div>
  );
};

export default DetailTours;
