import React, { useEffect, useState, useContext } from "react";
import { toast } from "react-toastify";
import toursApi from "../../services/toursApi";
import JwtDecode from "jwt-decode";
import bookingApi from "../../services/bookingApi";
import authContext from "../../contexts/authContext";

const DetailTours = ({ match }) => {
  const { id } = match.params;
  const { isAuthenticated, setIsAuthenticated } = useContext(authContext);
  const [tours, setTours] = useState({});
  const [booking, setBooking] = useState({});
  console.log(booking);
  const findUser = () => {
    if (isAuthenticated) {
      const token = window.localStorage.getItem("authToken");
      const { lastName, firstName, idUserToken } = JwtDecode(token);
      setBooking({
        user: "/api/users/" + idUserToken,
        tours: "/api/tours/" + Number(id),
      });
    }
  };

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
    findUser();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await bookingApi.create(booking);
      toast.success("La destination a bien été modifié");
    } catch ({ response }) {
      toast.error("Des erreurs dans votre formulaire !");
    }
  };

  return (
    <>
      <form className="container mt-5" onSubmit={handleSubmit}>
        <div className="form-group">
          <button
            type="submit"
            className="btn btn-success"
            disabled={!isAuthenticated}
          >
            Enregistrer
          </button>
        </div>
      </form>
    </>
  );
};

export default DetailTours;
