import React, { useState, useEffect } from "react";
import Field from "../components/forms/Field";
import { useParams } from "react-router-dom";
import usersApi from "../services/usersApi";
import { toast } from "react-toastify";

const PageProfile = (props) => {
  const { id } = useParams();
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const fetchUser = async (id) => {
    try {
      const data = await usersApi.find(id);
      setUser(data);
    } catch (error) {
      toast.error("L'utilisateur n'a pas pu être chargé");
      props.history.replace("/");
    }
  };

  useEffect(() => {
    fetchUser(id);
  }, [id]);

  const handleChange = ({ currentTarget }) => {
    const { name, value } = currentTarget;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const apiErrors = {};

    if (user.password !== user.passwordConfirm) {
      apiErrors.passwordConfirm =
        "Votre confirmation de mot de passe n'est pas conforme avec le mot de passe original";
      setErrors(apiErrors);
      toast.error("Des erreurs dans votre formulaire !");
      return;
    }

    try {
      setErrors({});
      await usersApi.update(id, user);
      toast.success("votre profil a bien été modifié");
    } catch ({ response }) {
      const { violations } = response.data;

      if (violations) {
        violations.forEach(({ propertyPath, message }) => {
          apiErrors[propertyPath] = message;
        });

        setErrors(apiErrors);
        toast.error("Des erreurs dans votre formulaire !");
      }
    }
  };

  return (
    <>
      <form
        className="container"
        onSubmit={handleSubmit}
        style={{ marginTop: "100px" }}
      >
        <h1>Mon profil</h1>
        <Field
          name="firstName"
          label="Prénom"
          placeholder="Votre joli prénom"
          error={errors.firstName}
          value={user.firstName}
          onChange={handleChange}
        />
        <Field
          name="lastName"
          label="Nom de famille"
          placeholder="Votre nom de famille"
          error={errors.lastName}
          value={user.lastName}
          onChange={handleChange}
        />
        <Field
          name="email"
          label="Adresse email"
          placeholder="Votre adresse email"
          type="email"
          error={errors.email}
          value={user.email}
          onChange={handleChange}
        />
        <Field
          name="password"
          label="Mot de passe"
          type="password"
          placeholder="Votre mot de passe ultra sécurisé"
          error={errors.password}
          onChange={handleChange}
        />
        <Field
          name="passwordConfirm"
          label="Confirmation de mot de passe"
          type="password"
          placeholder="Confirmez votre super mot de passe"
          error={errors.passwordConfirm}
          onChange={handleChange}
        />

        <div className="form-group">
          <button type="submit" className="btn btn-success">
            Confirmation
          </button>
        </div>
      </form>

      {user.bookings &&
        user.bookings.map((booking) => (
          <div key={booking.id} className="mt-3 col-sm-6 col-md-4">
            <h1>{booking.tours.title}</h1>
          </div>
        ))}
    </>
  );
};

export default PageProfile;
