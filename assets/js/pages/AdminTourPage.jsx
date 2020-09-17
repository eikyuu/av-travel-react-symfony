import React, { useState, useEffect } from "react";
import Field from "../components/forms/Field";
import { Link } from "react-router-dom";
import toursApi from "../services/toursApi";
import { toast } from "react-toastify";
import Select from "../components/forms/Select";
import destinationsApi from "../services/destinationsApi";
import ErrorBoundary from "../components/ErrorBoundary";

const AdminTourPage = (props) => {
  const { id = "new" } = props.match.params;
  const [destinations, setDestinations] = useState([]);
  const [tours, setTours] = useState({
    title: "",
    description: "",
    days: 0,
    price: 0,
    image: "",
    destinations: [],
  });

  const [errors, setErrors] = useState({
    title: "",
    description: "",
    days: "",
    price: "",
    image: "",
  });

  const [editing, setEditing] = useState(false);

  const fetchTours = async (id) => {
    try {
      const { title, description, days, price, image } = await toursApi.find(
        id
      );
      setTours({ title, description, days, price, image });
    } catch (error) {
      toast.error("Le tours n'a pas pu être chargé");
      props.history.replace("/admin/tours");
    }
  };

  const fetchDestinations = async () => {
    try {
      const data = await destinationsApi.findAll();
      setDestinations(data);
    } catch (error) {
      console.log("Impossible de charger les destinations");
    }
  };

  useEffect(() => {
    fetchDestinations();
  }, []);

  useEffect(() => {
    if (id !== "new") {
      setEditing(true);
      fetchTours(id);
    }
  }, [id]);

  const handleChange = ({ currentTarget }) => {
    const { name, value } = currentTarget;
    setTours({ ...tours, [name]: value });
  };

  const [state, setstate] = useState({ array: [] });

  const handleChangeSelect = (event) => {
    event.persist();
    setstate((state) => ({
      ...state,
      array: [...state.array, `/api/destinations/${event.target.value}`],
    }));
    setTours({ destinations: state.array });
  };

  console.log(tours.destinations);
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setErrors({});

      if (editing) {
        await toursApi.update(id, tours);
        toast.success("Le tours a bien été modifié");
      } else {
        await toursApi.create(tours);
        toast.success("Le tours a bien été créé");
        props.history.replace("/admin/tours");
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

  const [fields, setFields] = useState([{ value: null }]);

  const handleAdd = () => {
    const values = [...fields];
    values.push({ value: null });
    setFields(values);
  };

  function handleRemove(i) {
    const values = [...fields];
    values.splice(i, 1);
    setFields(values);
  }

  return (
    <>
      <ErrorBoundary>
        <form className="container" onSubmit={handleSubmit}>
          {(!editing && <h1>Création d'une croisière</h1>) || (
            <h1>Modification d'une croisière</h1>
          )}
          <Field
            name="title"
            label="Titre"
            placeholder="Titre du tours"
            value={tours.title}
            onChange={handleChange}
            error={errors.title}
            type="text"
          />
          <Field
            name="description"
            label="Description"
            placeholder="Description du tours"
            value={tours.description}
            onChange={handleChange}
            error={errors.description}
            type="text"
          />
          <Field
            name="days"
            label="Jours"
            placeholder="Nombre de jours du tours"
            value={tours.days}
            onChange={handleChange}
            error={errors.days}
            type="number"
          />
          <Field
            name="price"
            label="Prix"
            placeholder="Prix du tours"
            value={tours.price}
            onChange={handleChange}
            error={errors.price}
            type="number"
          />
          <Field
            name="image"
            label="Image"
            placeholder="Image du tours"
            value={tours.image}
            onChange={handleChange}
            error={errors.image}
            type="text"
          />

          {fields.map((field, idx) => {
            return (
              <div key={`${field}-${idx}`}>
                <Select
                  name="destinations"
                  label="destinations"
                  onChange={handleChangeSelect}
                >
                  {destinations.map((destinations) => (
                    <option key={destinations.id} value={destinations.id}>
                      {destinations.title}
                    </option>
                  ))}
                </Select>
                <button type="button" onClick={() => handleRemove(idx)}>
                  X
                </button>
              </div>
            );
          })}

          <button type="button" onClick={handleAdd}>
            +
          </button>

          <div className="form-group">
            <button type="submit" className="btn btn-success">
              Enregistrer
            </button>
            <Link to="/admin/tours" className="btn btn-link">
              Retour
            </Link>
          </div>
        </form>
      </ErrorBoundary>
    </>
  );
};

export default AdminTourPage;
