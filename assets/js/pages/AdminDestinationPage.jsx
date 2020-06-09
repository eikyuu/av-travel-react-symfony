import React, { useState, useEffect } from "react";
import Field from "../components/forms/Field";
import { Link } from "react-router-dom";
import destinationsApi from "../services/destinationsApi";
import { toast } from "react-toastify";

const AdminDestinationPage = (props) => {
  const { id = "new" } = props.match.params;
  const [destinations, setDestinations] = useState({
    title: "",
    description: "",
    pays: "",
    city: "",
    image: "",
  });

  const [errors, setErrors] = useState({
    title: "",
    description: "",
    pays: "",
    city: "",
    image: "",
  });

  const [editing, setEditing] = useState(false);

  const fetchDestination = async (id) => {
    try {
      const {
        title,
        description,
        pays,
        city,
        image,
      } = await destinationsApi.find(id);
      setDestinations({ title, description, pays, city, image });
    } catch (error) {
      toast.error("La destination n'a pas pu être chargé");
      props.history.replace("/admin/destinations");
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
        toast.success("La destionation a bien été créé");
        props.history.replace("/admin/destinations");
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
      <form className="container" onSubmit={handleSubmit}>
        {(!editing && <h1>Création d'une destination</h1>) || (
          <h1>Modification d'une destination</h1>
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
          name="pays"
          label="Pays"
          placeholder="Pays de la destination"
          value={destinations.pays}
          onChange={handleChange}
          error={errors.pays}
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
    </>
  );
};

export default AdminDestinationPage;
