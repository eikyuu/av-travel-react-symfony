import React, { useState, useEffect } from "react";
import Field from "../components/forms/Field";
import { Link } from "react-router-dom";
import destinationsApi from "../services/destinationsApi";
import { toast } from "react-toastify";
import ErrorBoundary from "../components/ErrorBoundary";

const AdminDestinationPage = ({ match, history }) => {
  const { id = "new" } = match.params;
  const [destinations, setDestinations] = useState({
    title: "",
    description: "",
    country: "",
    city: "",
    image: "",
  });

  const [errors, setErrors] = useState({
    title: "",
    description: "",
    country: "",
    city: "",
    image: "",
  });

  const [editing, setEditing] = useState(false);

  const fetchDestination = async (id) => {
    try {
      const {
        title,
        description,
        country,
        city,
        image,
      } = await destinationsApi.find(id);
      setDestinations({ title, description, country, city, image });
    } catch (error) {
      toast.error("La destination n'a pas pu être chargé");
      history.replace("/admin/destinations");
    }
  };

  useEffect(() => {
    if (id !== "new") {
      setEditing(true);
      fetchDestination(id);
    }
  }, [id]);

  const handleChange = ({ currentTarget }) => {
    const { name, value } = currentTarget;
    setDestinations({ ...destinations, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setErrors({});

      if (editing) {
        await destinationsApi.update(id, destinations);
        toast.success("La destination a bien été modifié");
      } else {
        await destinationsApi.create(destinations);
        toast.success("La destination a bien été créé");
        history.replace("/admin/destinations");
      }
    } catch ({ response }) {
      const { violations } = response.data;

      if (violations) {
        const apiErrors = {};
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
      <ErrorBoundary>
        <form className="container mt-5" onSubmit={handleSubmit}>
          {(!editing && (
            <h1 style={{ marginTop: "80px", fontSize: "1.7em" }}>
              Création d'une destination
            </h1>
          )) || (
            <h1 style={{ marginTop: "80px", fontSize: "1.7em" }}>
              Modification d'une destination
            </h1>
          )}
          <Field
            name="title"
            label="Titre"
            placeholder="Titre de la destination"
            value={destinations.title}
            onChange={handleChange}
            error={errors.title}
            type="text"
          />
          <Field
            name="description"
            label="Description"
            placeholder="Description de la destination"
            value={destinations.description}
            onChange={handleChange}
            error={errors.description}
            type="text"
          />
          <Field
            name="country"
            label="Pays"
            placeholder="country de la destination"
            value={destinations.country}
            onChange={handleChange}
            error={errors.country}
            type="text"
          />
          <Field
            name="city"
            label="Ville"
            placeholder="Ville la destination"
            value={destinations.city}
            onChange={handleChange}
            error={errors.city}
            type="text"
          />
          <Field
            name="image"
            label="Image"
            placeholder="Image de la destination"
            value={destinations.image}
            onChange={handleChange}
            error={errors.image}
            type="text"
          />

          <div className="form-group">
            <button type="submit" className="btn btn-success">
              Enregistrer
            </button>
            <Link to="/admin/destinations" className="btn btn-link">
              Retour
            </Link>
          </div>
        </form>
      </ErrorBoundary>
    </>
  );
};

export default AdminDestinationPage;
