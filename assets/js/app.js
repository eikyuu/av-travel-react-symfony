import React, { useState } from "react";
import ReactDOM from "react-dom";
import { HashRouter, Route, Switch, withRouter } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/navbar/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import AuthContext from "./contexts/authContext";
import AdminDestinationPage from "./pages/AdminDestinationPage";
import AdminDestinationsPage from "./pages/adminDestinationsPage/AdminDestinationsPage";
import AdminTourPage from "./pages/AdminTourPage";
import AdminToursPage from "./pages/adminToursPage/AdminToursPage";
import DestinationsPage from "./pages/DestinationsPage";
import DestinationTours from "./pages/DestinationTours";
import DetailDestination from "./pages/detailDestination/DetailDestination";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ToursPage from "./pages/ToursPage";
import authApi from "./services/authApi";

authApi.setup();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    authApi.isAuthenticated()
  );

  const NavbarWithRouter = withRouter(Navbar);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
      }}
    >
      <HashRouter>
        <NavbarWithRouter />

        <main className="app">
          <Switch>
            <Route path="/login" component={LoginPage} />
            <Route path="/register" component={RegisterPage} />
            <Route path="/tours" component={ToursPage} />
            <Route
              path="/destinations/:id/tours"
              component={DestinationTours}
            />
            <Route path="/destinations/:id" component={DetailDestination} />
            <Route path="/destinations" component={DestinationsPage} />
            <PrivateRoute path="/admin/tours/:id" component={AdminTourPage} />
            <PrivateRoute path="/admin/tours" component={AdminToursPage} />
            <PrivateRoute
              path="/admin/destinations/:id"
              component={AdminDestinationPage}
            />
            <PrivateRoute
              path="/admin/destinations"
              component={AdminDestinationsPage}
            />
            <Route path="/" component={HomePage} />
          </Switch>

          <ToastContainer position={toast.POSITION.BOTTOM_LEFT} />
        </main>
      </HashRouter>
    </AuthContext.Provider>
  );
};

const rootElement = document.querySelector("#app");
ReactDOM.render(<App />, rootElement);
