import React from "react";
import ReactDOM from "react-dom";
import Navbar from "./components/Navbar";
import { HashRouter, Route, Switch, withRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AdminToursPage from "./pages/AdminToursPage";
import DestinationsPage from "./pages/DestinationsPage";
import ToursPage from "./pages/ToursPage";
import AdminDestinationPage from "./pages/AdminDestinationPage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminTourPage from "./pages/AdminTourPage";
import AdminDestinationsPage from "./pages/adminDestinationsPage/AdminDestinationsPage";
import DetailDestination from "./pages/DetailDestination";

const App = () => {
  const NavbarWithRouter = withRouter(Navbar);

  return (
    <HashRouter>
      <NavbarWithRouter />

      <main className="app">
        <Switch>
          <Route path="/tours" component={ToursPage} />
          <Route path="/destinations/:id" component={DetailDestination} />
          <Route path="/destinations" component={DestinationsPage} />
          <Route path="/admin/tours/:id" component={AdminTourPage} />
          <Route path="/admin/tours" component={AdminToursPage} />
          <Route
            path="/admin/destinations/:id"
            component={AdminDestinationPage}
          />
          <Route path="/admin/destinations" component={AdminDestinationsPage} />
          <Route path="/" component={HomePage} />
        </Switch>

        <ToastContainer position={toast.POSITION.BOTTOM_LEFT} />
      </main>
    </HashRouter>
  );
};

const rootElement = document.querySelector("#app");
ReactDOM.render(<App />, rootElement);
