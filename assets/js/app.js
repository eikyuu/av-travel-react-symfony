import React, { useState, lazy, Suspense } from "react";
import ReactDOM from "react-dom";
import { HashRouter, Route, Switch, withRouter } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import authApi from "./services/authApi";
import PrivateRoute from "./components/PrivateRoute";
import AuthContext from "./contexts/authContext";
import Navbar from "./components/navbar/Navbar";

const AdminDestinationPage = lazy(() => import("./pages/AdminDestinationPage"));
const AdminDestinationsPage = lazy(() =>
  import("./pages/adminDestinationsPage/AdminDestinationsPage")
);
const AdminTourPage = lazy(() => import("./pages/AdminTourPage"));
const AdminToursPage = lazy(() =>
  import("./pages/adminToursPage/AdminToursPage")
);
const DestinationsPage = lazy(() => import("./pages/DestinationsPage"));
const DestinationTours = lazy(() => import("./pages/DestinationTours"));
const DetailDestination = lazy(() =>
  import("./pages/detailDestination/DetailDestination")
);
const HomePage = lazy(() => import("./pages/HomePage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage"));
const ToursPage = lazy(() => import("./pages/ToursPage"));
const PrivateProfile = lazy(() => import("./components/PrivateProfile"));
const DetailTours = lazy(() => import("./pages/detailTours/DetailTours"));

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
          <Suspense fallback={<div>Chargement...</div>}>
            <Switch>
              <Route path="/login" component={LoginPage} />
              <Route path="/register" component={RegisterPage} />
              <Route path="/tour/:id" component={DetailTours} />
              <Route path="/tours" component={ToursPage} />
              <Route
                path="/destination/:id/tours"
                component={DestinationTours}
              />
              <Route path="/destination/:id" component={DetailDestination} />
              <Route path="/destinations" component={DestinationsPage} />
              <PrivateRoute path="/admin/tour/:id" component={AdminTourPage} />
              <PrivateRoute path="/admin/tours" component={AdminToursPage} />
              <PrivateRoute
                path="/admin/destination/:id"
                component={AdminDestinationPage}
              />
              <PrivateRoute
                path="/admin/destinations"
                component={AdminDestinationsPage}
              />
              <Route path="/profile/:id" component={PrivateProfile} />
              <Route path="/" component={HomePage} />
            </Switch>
          </Suspense>

          <ToastContainer position={toast.POSITION.BOTTOM_LEFT} />
        </main>
      </HashRouter>
    </AuthContext.Provider>
  );
};

const rootElement = document.querySelector("#app");
ReactDOM.render(<App />, rootElement);
