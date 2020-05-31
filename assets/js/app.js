import React from "react";
import ReactDOM from "react-dom";
import Navbar from "./components/Navbar";
import { HashRouter, Route, Switch, withRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AdminDestinationsPage from "./pages/AdminDestinationsPage";
import AdminToursPage from "./pages/AdminToursPage";
import DestinationsPage from "./pages/DestinationsPage";

const App = () => {
  const NavbarWithRouter = withRouter(Navbar);

  return (
    <HashRouter>
      <NavbarWithRouter />

      <main className="app">
        <Switch>
          <Route path="/destinations" component={DestinationsPage} />
          <Route path="/admin/tours" component={AdminToursPage} />
          <Route path="/admin/destinations" component={AdminDestinationsPage} />
          <Route path="/" component={HomePage} />
        </Switch>
      </main>
    </HashRouter>
  );
};

const rootElement = document.querySelector("#app");
ReactDOM.render(<App />, rootElement);
