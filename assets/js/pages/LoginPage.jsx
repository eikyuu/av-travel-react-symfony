import React, { useState, useContext } from "react";
import AuthApi from "../services/authApi";
import AuthContext from "../contexts/authContext";
import Field from "../components/forms/Field";
import { toast } from "react-toastify";
import ErrorBoundary from "../components/ErrorBoundary";

const LoginPage = ({ history }) => {
  const { setIsAuthenticated } = useContext(AuthContext);

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");

  // Gestion des champs
  const handleChange = ({ currentTarget }) => {
    const { value, name } = currentTarget;
    setCredentials({ ...credentials, [name]: value });
  };

  // Gestion du submit
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await AuthApi.authenticate(credentials);
      setError("");
      setIsAuthenticated(true);
      toast.success("vous etes désormais connecté");
      history.replace("/");
    } catch (error) {
      setError(
        "Aucun compte ne possède cette adresse email ou alors les informations ne correspondent pas !"
      );
      toast.error("une erreur est survenue");
    }
  };

  return (
    <>
      <h1>Connexion à l'application</h1>
      <ErrorBoundary>
        <form onSubmit={handleSubmit} className="container mt-5">
          <Field
            label="Adresse email"
            name="username"
            value={credentials.username}
            onChange={handleChange}
            placeholder="Adresse email de connexion"
            error={error}
          />

          <Field
            name="password"
            label="Mot de passe"
            value={credentials.password}
            onChange={handleChange}
            type="password"
            error=""
          />

          <div className="form-group">
            <button type="submit" className="btn btn-success">
              Je me connecte
            </button>
          </div>
        </form>
      </ErrorBoundary>
    </>
  );
};
export default LoginPage;
